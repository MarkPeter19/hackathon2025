using MePlusPlusBE.Models;

namespace MePlusPlusBE.Interfaces
{
    public interface IQuestRepository
    {
        Task<Quest?> GetQuestById(int questId);
        Task<ICollection<Quest>?> GetDailyQuestsByPlanIds(List<int> planIds);
        Task<bool> UpdateQuestDone(int questId);
    }
}
