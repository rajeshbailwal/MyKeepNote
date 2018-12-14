import { Component, OnInit, Inject } from '@angular/core';
import { Note } from '../../models/note';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotesService } from '../../services/notes.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ToasterCustomService } from '../../services/toaster.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
  tagWarning: boolean;
  // edit noteview component used to display the popup with preloaded values 
  constructor(private dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private noteService: NotesService, private toasterService: ToasterCustomService) { }

  ngOnInit() {
    this.note = new Note();
    //this.note = this.noteService.getNoteById(parseInt(this.data.noteId, 0));
    this.noteService.getNotesById(parseInt(this.data.noteId, 0)).subscribe(
      data => {
        this.note = data;
      },
      error => {
        this.toasterService.showError(error.message);
      }
    );
  }

  onSave() {
    this.noteService.editNote(this.note).subscribe(
      editNote => {
        this.toasterService.showSuccess('Note edited successfully.');
        this.dialogRef.close();
      },
      err => {
        this.toasterService.showError(err.message);
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
}
