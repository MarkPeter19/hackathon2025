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
            var quests = await _context.Quests
                //.Where(q => planIds.Contains(q.PlanId) && q.Date == DateOnly.FromDateTime(DateTime.Now))
                .Where(q => planIds.Contains(q.PlanId))
                .OrderBy(q => Guid.NewGuid())
                .Take(3)
                .ToListAsync();
            if (quests != null)
            {
                return quests;
            }
            return null;
        }

        public Task<bool> UpdateQuestDone(int questId)
        {
            var quest = _context.Quests.Where(q => q.Id == questId).FirstOrDefault();
            quest.IsDone = !quest.IsDone;
            _context.Update(quest);
            return Save();
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public Task<Quest?> GetQuestById(int questId)
        {
            return _context.Quests.Where(q => q.Id == questId).FirstOrDefaultAsync();
        }
    }
}
