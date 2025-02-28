namespace MePlusPlusBE.Models
{
    public class CheckQuest
    {
        public int Id { get; set; }
        public required string RecomendedActivity { get; set; }
        public required string Mesure { get; set; }
        public ICollection<Quest>? Quests { get; set; }
    }
}
