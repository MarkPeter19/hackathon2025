using MePlusPlusBE.Models;

namespace MePlusPlusBE.Dto
{
    public class QuestDto
    {
        public int Id { get; set; }
        public int XpLevel { get; set; }
        public DateOnly Date { get; set; }
        public int? CheckQuestId { get; set; }
        public CheckQuestDto? CheckQuest { get; set; }
        public bool IsDone { get; set; }
    }
}
