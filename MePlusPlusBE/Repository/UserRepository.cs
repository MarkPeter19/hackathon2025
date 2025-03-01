using MePlusPlusBE.Data;
using MePlusPlusBE.Dto;
using MePlusPlusBE.Interfaces;
using MePlusPlusBE.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

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

        public async Task<bool> UpdateUserXp(int userId, int xpAmount)
        {
            var user = await _context.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();

            user.XpLevel += xpAmount;
            _context.Update(user);

            if (await Save() == true)
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        private async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
