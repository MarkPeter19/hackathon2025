using MePlusPlusBE.Models;

namespace MePlusPlusBE.Interfaces
{
    public interface ILevelRepository
    {
        Task<Level> GetLevelById(int id);
    }
}
