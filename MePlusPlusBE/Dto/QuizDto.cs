namespace MePlusPlusBE.Dto
{
    public class QuizDto
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string AnswerOne { get; set; }
        public string AnswerTwo { get; set; }
        public string CorrectAnswer { get; set; }
    }
}
