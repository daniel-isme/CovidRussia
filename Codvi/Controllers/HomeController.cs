using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Codvi.Models;
using Codvi.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using System.IO;
using Codvi.DataConversion;

namespace Codvi.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context, ILogger<HomeController> logger)
        {
            _logger = logger;
            _context = context;
        }

        public IActionResult Index()
        {
            var regions = _context.Regions
                .Include(r => r.DailyStats)
                .ToList();

            foreach (Region region in regions) // sorting by date
            {
                region.DailyStats = region.DailyStats.OrderBy(d => d.Date).ToList();
            }

            var model = new JsonStatsModel();
            model.JsonString = JsonConvert.SerializeObject(regions, Formatting.None,
                        new JsonSerializerSettings()
                        {
                            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                        });
            return View(model);
        }

        //public IActionResult Index()
        //{
        //    return View();
        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public IActionResult Index(StartPageAction action)
        //{
        //    switch (action)
        //    {
        //        case StartPageAction.Init:

        //            initData();
        //            return this.View("Success");

        //        case StartPageAction.Update:

        //            Cleaner.ClearRawText(
        //                readPath: @"C:\Users\danii\source\repos\CovidRussia\CovidRussia\AllDataFiles\TextData\raw_text_data.txt",
        //                writePath: @"C:\Users\danii\source\repos\CovidRussia\CovidRussia\AllDataFiles\TextData\cleared_raw.txt");

        //            var regionsLocal = StatNormalizer.Normalize(
        //                readPath: @"C:\Users\danii\source\repos\CovidRussia\CovidRussia\AllDataFiles\TextData\cleared_raw.txt",
        //                writePath: @"C:\Users\danii\source\repos\CovidRussia\CovidRussia\AllDataFiles\TextData\normalized.txt");

        //            updateData(regionsLocal);

        //            return this.View("Success");

        //        default:
        //            throw new ArgumentOutOfRangeException(nameof(action), action, null);
        //    }
        //}

        //private void updateData(List<StatNormalizer.RegLocal> regionsLocal)
        //{
        //    foreach (StatNormalizer.RegLocal regLocal in regionsLocal)
        //    {
        //        foreach (StatNormalizer.StatLocal statLocal in regLocal.Stats)
        //        {
        //            var stat = _context.DailyStats.SingleOrDefault(s => s.Date == statLocal.Date && s.RegionId == regLocal.Id);
        //            if (stat != null)
        //            {
        //                stat.NewCases = statLocal.Cases;
        //                stat.NewDeaths = statLocal.Deaths;
        //                stat.NewRecovered = statLocal.Recovered;
        //            }

        //        }
        //    }

        //    _context.SaveChanges();
        //}

        //private void initData()
        //{
        //    string readPath = @"C:\Users\danii\source\repos\CovidRussia\CovidRussia\AllDataFiles\TextData\all_regions_list.txt";
        //    string line;
        //    Regex idRegex = new Regex(@"\d*");
        //    Regex regionRegex = new Regex(@"[А-Я].*");

        //    StreamReader sr = new StreamReader(readPath, System.Text.Encoding.Default);
        //    while ((line = sr.ReadLine()) != null) // reading one line
        //    {
        //        int idFromStr = Int32.Parse(idRegex.Match(line).Value);
        //        string regName = regionRegex.Match(line).Value;
        //        var region = new Region
        //        {
        //            Id = idFromStr,
        //            Name = regName,
        //            IsLockedDown = false
        //        };

        //        _context.Regions.Add(region);

        //        DateTime from = DateTime.Parse("1/31/2020 12:00:00 AM");
        //        DateTime thru = DateTime.Parse("4/4/2020 12:00:00 AM");
        //        for (var day = from.Date; day.Date <= thru.Date; day = day.AddDays(1))
        //        {
        //            var stat = new DailyStat
        //            {
        //                RegionId = region.Id,
        //                Date = day,
        //                NewCases = 0,
        //                NewDeaths = 0,
        //                NewRecovered = 0,
        //            };
        //            this._context.Add(stat);
        //        }
        //    }

        //    _context.SaveChanges();
        //}

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
