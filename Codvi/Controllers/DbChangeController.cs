using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Codvi.Data;
using Codvi.DataConversion;
using Codvi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Codvi.Controllers
{
    public class DbChangeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DbChangeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public string folder = @"C:\Users\danii\Source\Repos\CovidRussia\Codvi\AllDataFiles\TextData\";

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Index(StartPageAction action)
        {
            switch (action)
            {
                case StartPageAction.Init:

                    initData();
                    ViewData["Action"] = "Init";
                    break;

                case StartPageAction.Update:

                    ViewData["Action"] = "Update";
                    //Cleaner.ClearRawText(
                    //    readPath: folder + @"raw_text_data.txt",
                    //    writePath: folder + @"cleared_raw.txt");

                    var regionsLocal = StatNormalizer.Normalize(
                        readPath: folder + @"cleared_raw.txt",
                        writePath: folder + @"normalized.txt");

                    updateData(regionsLocal);
                    break;

                case StartPageAction.InsertNewDays:

                    //TODO
                    var regions = _context.Regions
                        .Include(r => r.DailyStats)
                        .ToList();

                    foreach (Region region in regions) // sort by date
                    {
                        region.DailyStats = region.DailyStats.OrderBy(d => d.Date).ToList();
                    }

                    foreach (Region region in regions)
                    {
                        DateTime from = region.DailyStats.Last().Date;
                        from = from.AddDays(1);
                        DateTime thru = DateTime.Today;
                        for (var day = from.Date; day.Date <= thru.Date; day = day.AddDays(1))
                        {
                            var stat = new DailyStat
                            {
                                RegionId = region.Id,
                                Date = day,
                                NewCases = 0,
                                NewDeaths = 0,
                                NewRecovered = 0,
                            };
                            this._context.Add(stat);
                        }
                    }
                    _context.SaveChanges();

                    ViewData["Action"] = "UpdateDates";
                    break;

                default:
                    throw new ArgumentOutOfRangeException(nameof(action), action, null);
            }

            return this.View("Success");
        }

        private void updateData(List<StatNormalizer.RegLocal> regionsLocal)
        {
            foreach (StatNormalizer.RegLocal regLocal in regionsLocal)
            {
                foreach (StatNormalizer.StatLocal statLocal in regLocal.Stats)
                {
                    if (statLocal == regLocal.Stats.Last())
                    {
                        continue;
                    }
                    var stat = _context.DailyStats.SingleOrDefault(s => s.Date == statLocal.Date && s.RegionId == regLocal.Id);
                    if (stat != null && stat.NewCases == 0 && stat.NewDeaths == 0 && stat.NewRecovered == 0)
                    {
                        stat.NewCases = statLocal.Cases;
                        stat.NewDeaths = statLocal.Deaths;
                        stat.NewRecovered = statLocal.Recovered;
                    }

                }
            }

            _context.SaveChanges();
        }

        private void initData()
        {
            string readPath = folder + @"all_regions_list.txt";
            string line;
            Regex idRegex = new Regex(@"\d*");
            Regex regionRegex = new Regex(@"[А-Я].*");

            StreamReader sr = new StreamReader(readPath, System.Text.Encoding.Default);
            while ((line = sr.ReadLine()) != null) // reading one line
            {
                int idFromStr = Int32.Parse(idRegex.Match(line).Value);
                string regName = regionRegex.Match(line).Value;
                var region = new Region
                {
                    Id = idFromStr,
                    Name = regName,
                    IsLockedDown = false
                };

                _context.Regions.Add(region);

                DateTime from = DateTime.Parse("1/31/2020 12:00:00 AM");
                DateTime thru = DateTime.Parse("4/16/2020 12:00:00 AM");
                for (var day = from.Date; day.Date <= thru.Date; day = day.AddDays(1))
                {
                    var stat = new DailyStat
                    {
                        RegionId = region.Id,
                        Date = day,
                        NewCases = 0,
                        NewDeaths = 0,
                        NewRecovered = 0,
                    };
                    this._context.Add(stat);
                }
            }

            _context.SaveChanges();
        }
    }
}