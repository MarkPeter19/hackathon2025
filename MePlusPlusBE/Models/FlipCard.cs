using System.ComponentModel.DataAnnotations.Schema;

namespace MePlusPlusBE.Models
{
    public class FlipCard
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string AnswerOne { get; set; }
        public string AnswerTwo { get; set; }
        public string CorrectAnswer { get; set; }
        [ForeignKey("FlipCardLevel")]
        public int FlipCardLevelId { get; set; }
        public FlipCardLevel FlipCardLevel { get; set; }
        public ICollection<FlipCardQuiz>? FlipCardQuizzes { get; set; }
    }
}
