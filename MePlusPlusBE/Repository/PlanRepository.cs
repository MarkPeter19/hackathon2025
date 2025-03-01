using MePlusPlusBE.Data;
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

    }
}
