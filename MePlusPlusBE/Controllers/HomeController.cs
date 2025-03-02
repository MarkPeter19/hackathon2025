using AutoMapper;
using MePlusPlusBE.Dto;
using MePlusPlusBE.Interfaces;
using MePlusPlusBE.Models;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

namespace MePlusPlusBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : Controller
    {
        private ICategoryRepository _categoryRepository;
        private readonly IUserRepository _userRepository;
        private IQuestRepository _questRepository;
        private IPlanRepository _planRepository;
        private ICheckQuestRepository _checkQuestRepository;
        private ILevelRepository _levelRepository;
        private readonly IMapper _mapper;

        public HomeController(ICategoryRepository _categoryRepository,IUserRepository userRepository,  IMapper mapper, IQuestRepository questRepository, IPlanRepository planRepository, ICheckQuestRepository checkQuestRepository, ILevelRepository levelRepository)
        {
            this._categoryRepository = _categoryRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _questRepository = questRepository;
            _planRepository = planRepository;
            _checkQuestRepository = checkQuestRepository;
            _levelRepository = levelRepository;
        }

        [HttpGet("getHome")]
        public async Task<IActionResult> GetHome(int id)
        {
            var user = _mapper.Map<UserDto>(await _userRepository.GetUserData(id));
            var plans = _mapper.Map<List<PlanDto>>(await _planRepository.GetPlansByUserNotFreezed(id));
            var planIds = plans.Select(p => p.Id).ToList();
            foreach(var plan in plans)
            {
                LevelDto levelDto = _mapper.Map<LevelDto>(await _levelRepository.GetLevelById(plan.LevelId));
                plan.LevelName = levelDto.Name;
                CategoryDto categoryDto = _mapper.Map<CategoryDto>(await _categoryRepository.GetCategoryById(plan.CategoryId));
                plan.CategoryName = categoryDto.Name;
            }

            var quests = _mapper.Map<List<QuestDto>>(await _questRepository.GetDailyQuestsByPlanIds(planIds));
            foreach(var quest in quests) {
                CategoryDto categoryDto = _mapper.Map<CategoryDto>(await _planRepository.GetCategoryByPlanId(quest.PlanId));
                quest.CategoryId = categoryDto.Id;
                quest.CategoryName = categoryDto.Name;
                if (quest.CheckQuestId != null)
                {
                    int checkQuestId = (int)quest.CheckQuestId;
                    quest.CheckQuest = _mapper.Map<CheckQuestDto>(await _checkQuestRepository.GetCheckQuestById(checkQuestId));
                }
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (user != null)
            {
                return Ok(new { user, plans, quests });
            }
            return NotFound();
        }

    }
}
