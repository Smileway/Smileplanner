using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Smileplanner.DAL;

namespace Smileplanner.Controllers
{
    //[Route("api/[controller]")]
    public class ProjectController : Controller
    {
        private ProjectContext _context;
        public ProjectController(ProjectContext context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View(_context.Project.ToList());
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Project project)
        {
            if (ModelState.IsValid)
            {
                _context.Project.Add(project);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(project);
        }
    }
}