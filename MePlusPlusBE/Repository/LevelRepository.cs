using MePlusPlusBE.Data;
using MePlusPlusBE.Interfaces;
using MePlusPlusBE.Models;
using Microsoft.EntityFrameworkCore;

namespace MePlusPlusBE.Repository
{
    public class LevelRepository : ILevelRepository
    {
        private readonly DataContext _context;
        public LevelRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Level?> GetLevelById(int id)
        {
            var level = await _context.Levels.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (level != null)
            {
                return level;
            }
            return null;
        }
    }
}
