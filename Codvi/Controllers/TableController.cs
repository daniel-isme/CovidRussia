using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Codvi.Data;
using Codvi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Codvi.Controllers
{
    public class TableController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TableController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Regions
        public IActionResult Index()
        {
            var regions = _context.Regions
                .Include(r => r.DailyStats)
                .ToList();

            DateTime lastUpdate = new DateTime();

            foreach (Region region in regions) // sort by date
            {
                region.DailyStats = region.DailyStats.OrderBy(d => d.Date).ToList();
                if (region.DailyStats.Last().Date > lastUpdate)
                {
                    lastUpdate = region.DailyStats.Last().Date;
                }
            }

            ViewData["LastUpdate"] = lastUpdate.ToString("dd.MM.yyyy");

            var regionsTable = new List<RegionTable>();

            foreach (Region region in regions)
            {
                var regionTable = new RegionTable
                {
                    RegionName = region.Name,
                    Cases = region.DailyStats.Sum(stat => stat.NewCases),
                    Deaths = region.DailyStats.Sum(stat => stat.NewDeaths),
                    Recovered = region.DailyStats.Sum(stat => stat.NewRecovered),
                    LastCases = region.DailyStats.Last().NewCases,
                    LastDeaths = region.DailyStats.Last().NewDeaths,
                    LastRecovered = region.DailyStats.Last().NewRecovered,
                };

                regionsTable.Add(regionTable);
            }

            return View(regionsTable);
        }
    }
}