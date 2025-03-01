namespace MePlusPlusBE.Dto
{
    public class PlanDto
    {
        public int Id { get; set; }
        public int LevelId { get; set; }
        public string LevelName { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int UserId { get; set; }
        public int Progressed { get; set; }
        public DateOnly LastDateCompleted { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly Duration { get; set; }
        public bool IsFreezed { get; set; }
        public bool IsDone { get; set; }
        //public ICollection<QuestDto>? Quests { get; set; }
    }
}
