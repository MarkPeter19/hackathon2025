using MePlusPlusBE.Models;

namespace MePlusPlusBE.Interfaces
{
    public interface IQuestRepository
    {
        Task<ICollection<Quest>?> GetDailyQuestsByPlanIds(List<int> planIds);
    }
}
