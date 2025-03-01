using MePlusPlusBE.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MePlusPlusBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestController : Controller
    {
        private IQuestRepository _questRepository;
        private IUserRepository _userRepository;

        public QuestController(IQuestRepository questRepository, IUserRepository userRepository)
        {
            _questRepository = questRepository;
            _userRepository = userRepository;
        }

        [HttpPut("updateQuestDone/{questId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdateQuestDone(int questId)
        {
            if (questId == 0)
            {
                return BadRequest("QuestId is required");
            }
            var quest = await _questRepository.GetQuestById(questId);
            if (quest == null)
            {
                return NotFound("Quest not found");
            }
            var result = await _questRepository.UpdateQuestDone(questId);
            if (result)
            {
                return Ok();
            }
            return BadRequest("Update failed");
        }

        [HttpPut("updateUserXp")]
        [ProducesResponseType(400)]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdateUserXp(int userId, int xpAmount)
        {
            if (userId == 0)
            {
                return BadRequest("UserId is required");
            }
            var user = await _userRepository.GetUserData(userId);
            if (user == null)
            {
                return NotFound("User not found");
            }
            user.XpLevel += xpAmount;
            var result = await _userRepository.UpdateUserXp(userId, xpAmount);
            if (result)
            {
                return Ok();
            }
            return BadRequest("Update failed");
        }
    }
}
