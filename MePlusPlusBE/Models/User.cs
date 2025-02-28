namespace MePlusPlusBE.Models
{
    public class User
    {
        public int Id { get; set; }
        public byte[] PasswordSalt { get; set; }
        public byte[] PasswordHash { get; set; }
        public string Email { get; set; }
        public string FirtName { get; set; }
        public string LastName { get; set; }
        public int XpLevel { get; set; }
        public ICollection<Plan>? Plans { get; set; }
    }
}
