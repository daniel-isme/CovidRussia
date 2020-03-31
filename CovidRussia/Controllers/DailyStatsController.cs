using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CovidRussia.Data;
using CovidRussia.Models;

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
        public async Task<IActionResult> Index()
        {
            var applicationDbContext = _context.DailyStats.Include(d => d.Region);
            return View(await applicationDbContext.ToListAsync());
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
                .FirstOrDefaultAsync(m => m.RegionId == id);
            if (dailyStat == null)
            {
                return NotFound();
            }

            return View(dailyStat);
        }

        // GET: DailyStats/Create
        public IActionResult Create()
        {
            ViewData["RegionId"] = new SelectList(_context.Regions, "Id", "Name");
            return View();
        }

        // POST: DailyStats/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("RegionId,StatsId,Date,NewCases,NewDeaths,NewRecovered")] DailyStat dailyStat)
        {
            if (ModelState.IsValid)
            {
                _context.Add(dailyStat);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["RegionId"] = new SelectList(_context.Regions, "Id", "Name", dailyStat.RegionId);
            return View(dailyStat);
        }

        // GET: DailyStats/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dailyStat = await _context.DailyStats.FindAsync(id);
            if (dailyStat == null)
            {
                return NotFound();
            }
            ViewData["RegionId"] = new SelectList(_context.Regions, "Id", "Name", dailyStat.RegionId);
            return View(dailyStat);
        }

        // POST: DailyStats/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("RegionId,StatsId,Date,NewCases,NewDeaths,NewRecovered")] DailyStat dailyStat)
        {
            if (id != dailyStat.RegionId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(dailyStat);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DailyStatExists(dailyStat.RegionId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["RegionId"] = new SelectList(_context.Regions, "Id", "Name", dailyStat.RegionId);
            return View(dailyStat);
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
            return RedirectToAction(nameof(Index));
        }

        private bool DailyStatExists(int id)
        {
            return _context.DailyStats.Any(e => e.RegionId == id);
        }
    }
}
