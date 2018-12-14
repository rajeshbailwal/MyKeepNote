import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Note } from '../models/note';
import { NotesService } from '../services/notes.service';
import { ToasterCustomService } from '../services/toaster.service';
import { NgForm } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  
})
export class DashboardComponent implements OnInit {

  note: Note = new Note();
  notes: Array<Note> = [];
  errMessage: string;
  alertmessage: string;
  alertType: string;

  constructor(private notesService: NotesService, private toasterService: ToasterCustomService) { }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.notesService.getNotes().subscribe(
      data => this.notes = data,
      error => {
        //this.errMessage = error.message;
        this.toasterService.showError(error.message);
      }
    );
  }

  takeNotes(form: NgForm) {
    this.errMessage = '';
    const formData = this.note;
    event.preventDefault();
   
    if (!formData.title || formData.title.length === 0 || !formData.text || formData.text.length === 0) {
      this.errMessage = `Title and Text both are required fields`;
    } else {
      //this.notes.push(this.note);
      this.notesService.addNote(this.note).subscribe(
        data => {
          this.notes = data;
          this.toasterService.showSuccess('Note added successfully.');
        },
        error => {
          if (error.status === 404) {
            this.toasterService.showError(error.message);
          } else {
            this.toasterService.showError(error.message);
          }
        }
      );
      this.note = new Note();
      form.reset();

    }
  }

  deleteNote(noteId) {
    this.notesService.deleteNote(noteId).subscribe(
      data => {
        this.getNotes();
        this.toasterService.showSuccess('Note Deleted Successfully.');
       },
      error => {
        console.log(JSON.stringify(error));
        this.toasterService.showError(error.message);
      }
    );
  }

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    let addTag = true;

    if (this.note.tags == null) {
      this.note.tags = new Array<string>();
    }

    const index = this.note.tags.indexOf(value);
    if (index >= 0 || this.note.tags.length === 5) {
      addTag = false;
    }

    if (addTag) {
      // Add our fruit
      if ((value || '').trim()) {
        this.note.tags.push(value.trim());
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.note.tags.indexOf(tag);

    if (index >= 0) {
      this.note.tags.splice(index, 1);
    }
  }
  //openEditView() {
  //  this.routerService.routeToEditNoteView(this.note.id);
  //  //console.log(this.note);
  //}

}
