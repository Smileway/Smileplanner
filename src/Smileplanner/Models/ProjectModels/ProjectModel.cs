using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Smileplanner.Models.ProjectModels
{
    public class ProjectModel
    {
        public string Title { get; set; }
        public float Duration { get; set; }
        public short Complete { get; set; }
        public DateTime Start { get; set; }
        public DateTime Finish { get; set; }
        public DateTime Type { get; set; }


        public bool HasPassword { get; set; }

        public IList<UserLoginInfo> Logins { get; set; }

        public string PhoneNumber { get; set; }

        public bool TwoFactor { get; set; }

        public bool BrowserRemembered { get; set; }
    }
}
