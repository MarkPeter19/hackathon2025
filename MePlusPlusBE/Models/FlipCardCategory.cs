namespace MePlusPlusBE.Models
{
    public class FlipCardCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string IconName { get; set; }
        public ICollection<FlipCard>? FlipCards { get; set; }
    }
}
