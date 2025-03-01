using MePlusPlusBE.Models;

namespace MePlusPlusBE.Interfaces
{
    public interface IPlanRepository
    {
        Task<ICollection<Plan>> GetPlansByUserNotFreezed(int id);
        Task<Category?> GetCategoryByPlanId(int id);
        Task<bool> AddNewPlan(Plan plan);
    }
}
