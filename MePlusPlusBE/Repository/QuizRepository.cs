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
            var flipCards = await _context.FlipCards
                .Where(fc => fc.FlipCardCategoryId == categoryId)
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
                }
            }

            return correctedResponses;
        }
    }
}
