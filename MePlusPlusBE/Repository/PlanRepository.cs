﻿using MePlusPlusBE.Data;
using MePlusPlusBE.Interfaces;
using MePlusPlusBE.Models;
using Microsoft.EntityFrameworkCore;

namespace MePlusPlusBE.Repository
{
    public class PlanRepository : IPlanRepository
    {
        private readonly DataContext _context;
        public PlanRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<ICollection<Plan>?> GetPlansByUserNotFreezed(int id)
        {
            var plans = await _context.Plans.Where(p => p.UserId == id && p.IsFreezed == false).ToListAsync();
            if (plans != null)
            {
                return plans;
            }
            return null;
        }
        public async Task<Category?> GetCategoryByPlanId(int id)
        {
            var plan = await _context.Plans.Where(p => p.Id == id).FirstOrDefaultAsync();
            if (plan != null)
            {
                var category = await _context.Categories.Where(c => c.Id == plan.CategoryId).FirstOrDefaultAsync();
                if (category != null)
                {
                    return category;
                }
            }
            return null;
        }

        public async Task<bool> AddNewPlan(Plan plan)
        {
            _context.Plans.Add(plan);
            return await Save();
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
