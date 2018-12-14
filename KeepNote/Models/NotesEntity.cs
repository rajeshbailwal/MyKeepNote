using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeepNote.Models
{
    public class NotesEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public List<string> Tags { get; set; }
    }
}
