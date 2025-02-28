using System.ComponentModel.DataAnnotations.Schema;

namespace MePlusPlusBE.Models
{
    public class Quest
    {
        public int Id { get; set; }
        [ForeignKey("Plan")]
        public int PlanId { get; set; }
        public Plan Plan { get; set; }
        public int XpLevel { get; set; }
        public DateOnly Date { get; set; }
        [ForeignKey("CheckQuest")]
        public int? CheckQuestId { get; set; }
        public CheckQuest? CheckQuest { get; set; }
        public bool IsDone { get; set; }
        public ICollection<FlipCardQuiz>? FlipCardQuizzes { get; set; }
    }
}
