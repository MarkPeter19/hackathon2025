using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;

namespace MePlusPlusBE.Models
{
    public class Plan
    {
        public int Id { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public User User { get; set; }
        [ForeignKey("Level")]
        public int LevelId { get; set; }
        public Level Level { get; set; }
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public int Progressed { get; set; }
        public DateOnly LastDateCompleted { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly Duration { get; set; }
        public bool IsFreezed { get; set; }
        public bool IsDone { get; set; }
        public TimeSpan TimePerDay { get; set; }
    }
}
