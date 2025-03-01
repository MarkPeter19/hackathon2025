using System.ComponentModel.DataAnnotations.Schema;

namespace MePlusPlusBE.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string IconName { get; set; }
        public ICollection<Plan>? Plans { get; set; }
    }
}
