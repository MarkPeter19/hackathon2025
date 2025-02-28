using System.ComponentModel.DataAnnotations.Schema;

namespace MePlusPlusBE.Models
{
    public class FlipCardQuiz
    {
        public int Id { get; set; }
        [ForeignKey("FlipCard")]
        public int FlipCardId { get; set; }
        public FlipCard FlipCard { get; set; }
        [ForeignKey("Quest")]
        public int QuestId { get; set; }
        public Quest Quest { get; set; }
        public bool? AnsweredCorrectly { get; set; }
        public string? UserAnswer { get; set; }
    }
}
