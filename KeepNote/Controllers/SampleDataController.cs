using System;
using System.Collections.Generic;
using System.Linq;
using KeepNote.Models;
using Microsoft.AspNetCore.Mvc;

namespace KeepNote.Controllers
{
    [Route("api/[controller]")]
    public class NotesController : Controller
    {
        private static List<NotesEntity> lstNotes = new List<NotesEntity>(){
            new NotesEntity { Id = 1, Title = "Test1", Text = "This is a test note1", Tags = new List<string> { "C#", "Test", "Angular" } },
                new NotesEntity { Id = 2, Title = "Test2", Text = "This is a test note2" },
                new NotesEntity { Id = 3, Title = "Test3", Text = "This is a test note3" },
        };

        [HttpGet("[action]")]
        public IEnumerable<NotesEntity> GetNotes()
        {
            return lstNotes.AsEnumerable();
        }

        [HttpGet("[action]")]
        [Route("GetNotesById/{noteId}")]
        public JsonResult GetNotesById(int noteId)
        {
            var note = lstNotes.Where(x => x.Id == noteId).FirstOrDefault();

            return Json(note);
        }

        [HttpPost("[action]")]
        public IEnumerable<NotesEntity> AddNote([FromBody]NotesEntity note)
        {
            var id = 1;
            if (lstNotes.Count > 0)
            {
                id = lstNotes.Max(x => x.Id) +1;
            }

            note.Id = id;
            lstNotes.Add(note);
            return lstNotes;
        }

        [HttpPut]
        [Route("EditNote/{id}")]
        public int EditNote(int id, [FromBody]NotesEntity note)
        {
            //return objemployee.UpdateEmployee(employee);

            NotesEntity existingNote = lstNotes.Where(x => x.Id == id).FirstOrDefault();

            lstNotes[lstNotes.IndexOf(existingNote)] = note;

            existingNote.Tags = note.Tags;
            return 1;
        }


        [HttpDelete]
        [Route("DeleteNote/{noteId}")]
        public Boolean DeleteNote(int noteId)
        {
            //return objemployee.UpdateEmployee(employee);

            lstNotes.Remove(lstNotes.Where(note => note.Id == noteId).First());
            return true;
        }
    }
}
