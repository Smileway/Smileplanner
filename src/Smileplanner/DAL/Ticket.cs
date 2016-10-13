using System;
using System.Collections.Generic;

namespace Smileplanner.DAL
{
    public partial class Ticket
    {
        public Guid Id { get; set; }
        public Guid? ProjectId { get; set; }
        public string ProjectName { get; set; }
        public int? No { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public int? PlanEstimate { get; set; }
        public int? ActualEstimate { get; set; }
        public double? CompletedPercent { get; set; }
        public DateTime? PlanStart { get; set; }
        public DateTime? PlanFinish { get; set; }
        public DateTime? ActualStart { get; set; }
        public DateTime? ActualFinish { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }
        public bool? IsDone { get; set; }
        public bool? IsChildExist { get; set; }

        public virtual Project Project { get; set; }
    }
}
