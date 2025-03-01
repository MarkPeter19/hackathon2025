using MePlusPlusBE.Data;
using MePlusPlusBE.Interfaces;
using MePlusPlusBE.Models;
using Microsoft.EntityFrameworkCore;

namespace MePlusPlusBE.Repository
{
    public class CheckQuestRepository : ICheckQuestRepository
    {
        public readonly DataContext _context;
        public CheckQuestRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<CheckQuest?> GetCheckQuestById(int id)
        {
            var checkQuest = await _context.CheckQuests.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (checkQuest != null)
            {
                return checkQuest;
            }
            return null;
        }
    }
}
