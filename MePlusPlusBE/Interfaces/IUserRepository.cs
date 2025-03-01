using MePlusPlusBE.Models;

namespace MePlusPlusBE.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetUserData(int id);
    }
}
