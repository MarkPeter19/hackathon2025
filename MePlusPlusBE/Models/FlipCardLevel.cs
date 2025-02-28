namespace MePlusPlusBE.Models
{
    public class FlipCardLevel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<FlipCard>? FlipCards { get; set; }
    }
}
