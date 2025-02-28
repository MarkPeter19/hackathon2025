using MePlusPlusBE.Models;
using Microsoft.EntityFrameworkCore;

namespace MePlusPlusBE.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { 

        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<CheckQuest> CheckQuests { get; set; }
        public DbSet<FlipCard> FlipCards { get; set; }
        public DbSet<FlipCardQuiz> FlipCardQuizzes { get; set; }
        public DbSet<Level> Levels { get; set; }
        public DbSet<FlipCardLevel> FlipCardLevels { get; set; }
        public DbSet<Plan> Plans { get; set; }
        public DbSet<Quest> Quests { get; set; }
        public DbSet<User> Users { get; set; }
     
    }
}
