using AutoMapper;
using MePlusPlusBE.AIClient;
using MePlusPlusBE.AIModels;
using MePlusPlusBE.Dto;
using MePlusPlusBE.Interfaces;
using MePlusPlusBE.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Newtonsoft.Json;
using System.Collections;

namespace MePlusPlusBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : Controller
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IQuizRepository _quizRepository;
        private readonly GeminiApiClient _geminiApiClient;
        private readonly IMapper _mapper;
        private readonly ILogger<QuizController> _logger;

        public QuizController(IQuizRepository quizRepository, IMapper mapper, GeminiApiClient geminiApiClient, ICategoryRepository categoryRepository, ILogger<QuizController> logger)
        {
            _categoryRepository = categoryRepository;
            _quizRepository = quizRepository;
            _geminiApiClient = geminiApiClient;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet("getFlipCardsByCategory")]
        public async Task<IActionResult> GetFlipCardsByCategory(int categoryId)
        {
            List<QuizDto> quizzes = new List<QuizDto>();
            int quizCount = 10;

            var flipCards = _mapper.Map<ICollection<QuizDto>>(await _quizRepository.GetFlipCardsByCategory(categoryId));
            _logger.LogInformation("Flipcards ", flipCards);

            if (flipCards.Count <= 5)
            {
                quizCount -= flipCards.Count;
                quizzes.AddRange(flipCards);
            }

            Category category = await _categoryRepository.GetCategoryById(categoryId);
            if (category == null)
            {
                return NotFound();
            }
            PromptRequest prompt = new PromptRequest();

            prompt.Prompt = "Send me ";
            prompt.Prompt += quizCount;
            prompt.Prompt += " a,b,c questions in ";
            prompt.Prompt += category.Name;
            prompt.Prompt += " topic, 2 incorrect, 1 correct answer. this is the format: { question: string, answerOne: string, answerTwo: string, correctAnswer: string}. send me just the json";

            var response = await _geminiApiClient.GenerateContentAsync(prompt.Prompt);

            if (response == null)
            {
                return NotFound();
            }

            var lines = response.Split('\n').ToList();

            if (lines.Count > 2)
            {
                lines.RemoveAt(0);
                lines.RemoveRange(lines.Count - 2, 2);
            }

            var cleanedResponse = string.Join("\n", lines);
            _logger.LogInformation("Cleaned response: {CleanedResponse}", cleanedResponse);


            if (!string.IsNullOrEmpty(cleanedResponse))
            {
                try
                {
                    var generatedQuizzes = JsonConvert.DeserializeObject<List<QuizDto>>(cleanedResponse);

                    if (generatedQuizzes != null)
                    {
                        var flipcards = _mapper.Map<ICollection<FlipCard>>(generatedQuizzes);
                        foreach (var item in flipcards)
                        {
                            item.FlipCardCategoryId = 23;
                            item.FlipCardLevelId = 16;
                        }
                        List<int> ids = await _quizRepository.AddFlipCards(flipcards);

                        for (int i = 0; i < generatedQuizzes.Count; i++)
                        {
                            generatedQuizzes[i].Id = ids[i];
                        }

                        quizzes.AddRange(generatedQuizzes);
                    }


                }
                catch (JsonException ex)
                {
                    return BadRequest("Invalid JSON format: " + ex.Message);
                }
            }

            return Ok(quizzes);
            
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
