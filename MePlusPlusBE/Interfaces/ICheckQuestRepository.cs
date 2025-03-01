using MePlusPlusBE.Models;

namespace MePlusPlusBE.Interfaces
{
    public interface ICheckQuestRepository
    {
        Task<CheckQuest?> GetCheckQuestById(int id);
    }
}
