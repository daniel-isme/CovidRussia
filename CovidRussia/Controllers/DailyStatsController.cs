using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CovidRussia.Data;
using CovidRussia.Models;
using CovidRussia.Models.ViewModels;

namespace CovidRussia.Controllers
{
    public class DailyStatsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DailyStatsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: DailyStats
        public async Task<IActionResult> Index(Int32? regionId)
        {
            if (regionId == null)
            {
                return this.NotFound();
            }

            var region = await this._context.Regions
                .SingleOrDefaultAsync(x => x.Id == regionId);

            if (region == null)
            {
                return this.NotFound();
            }

            this.ViewBag.Region = region;
            var stats = await this._context.DailyStats
                .Include(w => w.Region)
                .Where(x => x.RegionId == regionId)
                .ToListAsync();

            return this.View(stats);

            //var applicationDbContext = _context.DailyStats.Include(d => d.Region);
            //return View(await applicationDbContext.ToListAsync());
        }

        // GET: DailyStats/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dailyStat = await _context.DailyStats
                .Include(d => d.Region)
                .SingleOrDefaultAsync(m => m.RegionId == id);
            if (dailyStat == null)
            {
                return NotFound();
            }

            return View(dailyStat);
        }

        // GET: DailyStats/Create
        public async Task<IActionResult> Create(Int32? regionId)
        {
            if (regionId == null)
            {
                return this.NotFound();
            }

            var region = await this._context.Regions
                .SingleOrDefaultAsync(x => x.Id == regionId);

            if (region == null)
            {
                return this.NotFound();
            }

            this.ViewBag.Region = region;
            return this.View(new DailyStatCreateModel());
        }

        // POST: DailyStats/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Int32? regionId, DailyStatCreateModel model)
        {
            if (regionId == null)
            {
                return this.NotFound();
            }

            var region = await this._context.Regions
                .SingleOrDefaultAsync(x => x.Id == regionId);

            if (region == null)
            {
                return this.NotFound();
            }
            
            if (this.ModelState.IsValid)
            {
                var stat = new DailyStat
                {
                    RegionId = region.Id,
                    Date = model.Date,
                    NewCases = model.NewCases,
                    NewDeaths = model.NewDeaths,
                    NewRecovered = model.NewRecovered,
                };

                this._context.Add(stat);
                await this._context.SaveChangesAsync();
                return this.RedirectToAction("Index", new { regionId = region.Id });
            }

            this.ViewBag.Region = region;
            return this.View(model);

        }

        // GET: DailyStats/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return this.NotFound();
            }

            var stat = await this._context.DailyStats
                .SingleOrDefaultAsync(m => m.Id == id);
            if (stat == null)
            {
                return this.NotFound();
            }

            var model = new DailyStatEditModel
            {
                Date = stat.Date,
                NewCases = stat.NewCases,
                NewDeaths = stat.NewDeaths,
                NewRecovered = stat.NewRecovered
            };

            return this.View(model);

        }

        // POST: DailyStats/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int? id, DailyStatEditModel model)
        {
            if (id == null)
            {
                return this.NotFound();
            }

            var stat = await this._context.DailyStats
                .SingleOrDefaultAsync(m => m.Id == id);
            if (stat == null)
            {
                return this.NotFound();
            }

            if (this.ModelState.IsValid)
            {
                stat.Date = model.Date;
                stat.NewCases = model.NewCases;
                stat.NewDeaths = model.NewDeaths;
                stat.NewRecovered = model.NewRecovered;

                await this._context.SaveChangesAsync();
                return this.RedirectToAction("Index", new { regionId = stat.RegionId });
            }

            return this.View(model);

        }

        // GET: DailyStats/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dailyStat = await _context.DailyStats
                .Include(d => d.Region)
                .FirstOrDefaultAsync(m => m.RegionId == id);
            if (dailyStat == null)
            {
                return NotFound();
            }

            return View(dailyStat);
        }

        // POST: DailyStats/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var dailyStat = await _context.DailyStats.FindAsync(id);
            _context.DailyStats.Remove(dailyStat);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index), new { regionId = dailyStat.RegionId });
        }

        private bool DailyStatExists(int id)
        {
            return _context.DailyStats.Any(e => e.RegionId == id);
        }
    }
}
