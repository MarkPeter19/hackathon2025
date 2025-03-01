using MePlusPlusBE.Data;
using MePlusPlusBE.Interfaces;
using MePlusPlusBE.Models;
using Microsoft.EntityFrameworkCore;

namespace MePlusPlusBE.Repository
{
    public class QuestRepository : IQuestRepository
    {
        private readonly DataContext _context;
        public QuestRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<ICollection<Quest>?> GetDailyQuestsByPlanIds(List<int> planIds)
        {
            var quests = await _context.Quests.Where(q => planIds.Contains(q.PlanId) && q.Date == DateOnly.FromDateTime(DateTime.Now)).ToListAsync();
            if (quests != null)
            {
                return quests;
            }
            return null;
        }
    }
}
