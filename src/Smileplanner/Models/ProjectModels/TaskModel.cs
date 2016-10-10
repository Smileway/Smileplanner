using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Smileplanner.Models.TaskModels
{
    public class TasksModel
    {
        
    }
    public class TaskModel
    {
        public int UID {get;set;}
        public string Title { get; set; }
        public float Duration { get; set; }
    }
}
