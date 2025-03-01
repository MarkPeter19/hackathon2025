namespace MePlusPlusBE.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirtName { get; set; }
        public string LastName { get; set; }
        public int XpLevel { get; set; }
        //public ICollection<PlanDto>? Plans { get; set; }
    }
}
