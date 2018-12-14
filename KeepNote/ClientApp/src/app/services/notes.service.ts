import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from '../models/note';

@Injectable()
export class NotesService {
  myAppUrl: string = "";

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  getNotes(): Observable<Array<Note>> {
    return this._http.get<Array<Note>>(this.myAppUrl + 'api/Notes/GetNotes');
  }

  getNotesById(noteId): Observable<Note> {
    return this._http.get<Note>(this.myAppUrl + 'api/Notes/GetNotesById/' + noteId);
  }


  addNote(note: Note): Observable<Array<Note>> {
    return this._http.post<Array<Note>>(this.myAppUrl + `api/Notes/AddNote`, note);
    //return null;
  }
    
  editNote(note: Note): Observable<Note> {
    console.log('note.id ' + note.id)

    return this._http.put<Note>(this.myAppUrl + `api/Notes/EditNote/${note.id}`, note);
  }

  deleteNote(noteId: Number): Observable<boolean> {
    return this._http.delete<boolean>(this.myAppUrl + `api/Notes/DeleteNote/${noteId}`);
  }
} 
