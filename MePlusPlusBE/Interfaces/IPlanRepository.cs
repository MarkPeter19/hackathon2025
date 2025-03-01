using MePlusPlusBE.Models;

namespace MePlusPlusBE.Interfaces
{
    public interface IPlanRepository
    {
        Task<ICollection<Plan>> GetPlansByUserNotFreezed(int id);
    }
}
