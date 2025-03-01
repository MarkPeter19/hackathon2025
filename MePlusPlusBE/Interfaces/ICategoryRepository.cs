using MePlusPlusBE.Models;

namespace MePlusPlusBE.Interfaces
{
    public interface ICategoryRepository
    {
        Task<ICollection<Category>> GetCategories();
        Task<Category?> GetCategoryById(int id);
    }
}
