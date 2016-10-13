using System;
using System.Collections.Generic;

namespace Smileplanner.DAL
{
    public partial class Project
    {
        public Project()
        {
            Ticket = new HashSet<Ticket>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }

        public virtual ICollection<Ticket> Ticket { get; set; }
    }
}
