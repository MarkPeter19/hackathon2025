namespace MePlusPlusBE.Dto
{
    public class NewPlan
    {
        public int LevelId { get; set; }
        public int CategoryId { get; set; }
        public int UserId { get; set; }
        public DateOnly Duration { get; set; }
        public TimeSpan TimePerDay { get; set; }

    }
}
