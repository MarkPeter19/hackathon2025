using MePlusPlusBE.Data;
using MePlusPlusBE.Interfaces;
using MePlusPlusBE.Models;
using Microsoft.EntityFrameworkCore;

namespace MePlusPlusBE.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<User?> GetUserData(int id)
        {
            var user =  await _context.Users.Where(x => x.Id == id).FirstOrDefaultAsync();

            if (user != null)
            {
                return user;
            }
            return null;
        }
    }
}
