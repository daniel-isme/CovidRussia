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
    public class RegionsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public RegionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Regions
        public async Task<IActionResult> Index()
        {
            return View(await _context.Regions.ToListAsync());
        }

        // GET: Regions/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var region = await _context.Regions
                .FirstOrDefaultAsync(m => m.Id == id);
            if (region == null)
            {
                return NotFound();
            }

            return View(region);
        }

        // GET: Regions/Create
        public IActionResult Create()
        {
            return View(new RegionCreateModel());
        }

        // POST: Regions/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(RegionCreateModel model)
        {
            if (this.ModelState.IsValid)
            {
                var region = new Region
                {
                    Name = model.Name,
                    IsLockedDown = model.IsLockedDown,
                };

                this._context.Regions.Add(region);
                await this._context.SaveChangesAsync();
                return this.RedirectToAction("Index");
            }

            return this.View(model);
        }

        // GET: Regions/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var region = await _context.Regions.FindAsync(id);

            if (region == null)
            {
                return NotFound();
            }

            var model = new RegionEditModel
            {
                Name = region.Name,
                IsLockedDown = region.IsLockedDown
            };

            return View(model);
        }

        // POST: Regions/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int? id, RegionEditModel model)
        {
            if (id == null)
            {
                return this.NotFound();
            }

            var region = await this._context.Regions
                .SingleOrDefaultAsync(m => m.Id == id);
            if (region == null)
            {
                return this.NotFound();
            }

            if (this.ModelState.IsValid)
            {
                region.Name = model.Name;
                region.IsLockedDown = model.IsLockedDown;

                await this._context.SaveChangesAsync();
                return this.RedirectToAction("Index");
            }

            return this.View(model);
        }

        // GET: Regions/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var region = await _context.Regions
                .FirstOrDefaultAsync(m => m.Id == id);
            if (region == null)
            {
                return NotFound();
            }

            return View(region);
        }

        // POST: Regions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var region = await _context.Regions.FindAsync(id);
            _context.Regions.Remove(region);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool RegionExists(int id)
        {
            return _context.Regions.Any(e => e.Id == id);
        }
    }
}
