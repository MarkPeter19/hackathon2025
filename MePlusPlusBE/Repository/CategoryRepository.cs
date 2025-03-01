using MePlusPlusBE.Data;
using MePlusPlusBE.Interfaces;
using MePlusPlusBE.Models;
using Microsoft.EntityFrameworkCore;

namespace MePlusPlusBE.Repository
{
    public class CategoryRsepository : ICategoryRepository
    {
        private DataContext _context;
        public CategoryRsepository(DataContext context)
        {
            _context = context;
        }
        public async Task<ICollection<Category>?> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            if(categories != null)
            {
                return categories;
            }
            return null;
        }
    }
}
