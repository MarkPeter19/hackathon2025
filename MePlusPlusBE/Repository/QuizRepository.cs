using MePlusPlusBE.Data;
using MePlusPlusBE.Dto;
using MePlusPlusBE.Interfaces;
using MePlusPlusBE.Models;
using Microsoft.EntityFrameworkCore;

namespace MePlusPlusBE.Repository
{
    public class QuizRepository : IQuizRepository
    {
        public readonly DataContext _context;
        public QuizRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<ICollection<FlipCard>?> GetFlipCardsByCategory(int categoryId)
        {
            // Give me the name of the categoryId category
            var searchedCategory = await _context.Categories.Where(c => c.Id == categoryId).FirstOrDefaultAsync();
            if (searchedCategory == null) return null;
            var flipCards = await _context.FlipCards
                .Where(fc => fc.FlipCardCategory.Name.Equals(searchedCategory.Name))
                .OrderBy(r => Guid.NewGuid())
                .Take(10)
                .ToListAsync();

            if (flipCards != null)
            {
                return flipCards;
            }
            else
            {
                return null;
            }
        }

        public async Task<ICollection<CorrectedResponse>?> PostUserResponses(ICollection<UserResponseDto> responses)
        {
            if (responses == null)
            {
                return null;
            }

            var correctedResponses = new List<CorrectedResponse>();
            var correct_answers = 0;
            foreach (var response in responses)
            {
                var flipCard = await _context.FlipCards
                    .Where(fc => fc.Id == response.FlipCardId)
                    .FirstOrDefaultAsync();
                if (flipCard != null)
                {
                    correctedResponses.Add(new CorrectedResponse
                    {
                        Question = flipCard.Question,
                        UserAnswer = response.UserAnswer,
                        CorrectAnswer = flipCard.CorrectAnswer,
                    });

                    if (response.UserAnswer == flipCard.CorrectAnswer) correct_answers++;
                }
            }

            var user = await _context.Users.Where(u => u.Email == "test@gmail.com").FirstOrDefaultAsync();

            user.XpLevel += correct_answers;
            _context.Update(user);

            if (await Save() == true)
            {
                return correctedResponses;
            }
            else
            {
                return null;
            }
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
