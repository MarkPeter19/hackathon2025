using MePlusPlusBE.Dto;
using MePlusPlusBE.Models;

namespace MePlusPlusBE.Interfaces
{
    public interface IQuizRepository
    {
        Task<ICollection<FlipCard>?> GetFlipCardsByCategory(int categoryId);

        Task<ICollection<CorrectedResponse>?> PostUserResponses(ICollection<UserResponseDto> responses);
        Task<List<int>> AddFlipCards(ICollection<FlipCard> flipCards);
    }
}
