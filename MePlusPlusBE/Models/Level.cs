namespace MePlusPlusBE.Models
{
    public class Level
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Plan>? Plans { get; set; }
    }
}
