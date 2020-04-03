using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CovidRussia.Models;
using CovidRussia.Data;
using System.IO;

namespace CovidRussia.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Index(StartPageAction action)
        {
            switch (action)
            {
                case StartPageAction.Submit:

                    //fillRegionsFromFile();
                    
                    return this.View("Success");
                default:
                    throw new ArgumentOutOfRangeException(nameof(action), action, null);
            }
        }

        private void fillRegionsFromFile()
        {
            string readPath = @"C:\Users\danii\Desktop\CovidRussia\data\all_regions_list.txt";
            string line;

            StreamReader sr = new StreamReader(readPath, System.Text.Encoding.Default);
            while ((line = sr.ReadLine()) != null) // reading one line
            {
                var region = new Region
                {
                    Name = line,
                    IsLockedDown = false,
                };

                _context.Regions.Add(region);
            }

            _context.SaveChanges();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
