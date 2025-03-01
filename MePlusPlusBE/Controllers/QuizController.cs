using AutoMapper;
using MePlusPlusBE.Dto;
using MePlusPlusBE.Interfaces;
using MePlusPlusBE.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace MePlusPlusBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : Controller
    {
        private readonly IQuizRepository _quizRepository;
        private readonly IMapper _mapper;

        public QuizController(IQuizRepository quizRepository, IMapper mapper)
        {
            _quizRepository = quizRepository;
            _mapper = mapper;
        }

        [HttpGet("getFlipCardsByCategory")]
        public async Task<IActionResult> GetFlipCardsByCategory(int categoryId)
        {
            var flipCards = _mapper.Map<ICollection<QuizDto>>(await _quizRepository.GetFlipCardsByCategory(categoryId));
            if (flipCards != null)
            {
                return Ok(flipCards);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost("postUserResponses")]
        public async Task<IActionResult> PostUserResponses(ICollection<UserResponseDto> responses)
        {
            var userResponses = await _quizRepository.PostUserResponses(responses);
            if (userResponses != null)
            {
                return Ok(userResponses);
            }
            else
            {
                return NotFound();
            }
        }

    }
}
