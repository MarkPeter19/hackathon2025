using MePlusPlusBE.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MePlusPlusBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestController : Controller
    {
        private IQuestRepository _questRepository;

        public QuestController(IQuestRepository questRepository)
        {
            _questRepository = questRepository;
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
    }
}
