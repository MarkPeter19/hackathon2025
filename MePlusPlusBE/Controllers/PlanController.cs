using AutoMapper;
using MePlusPlusBE.Dto;
using MePlusPlusBE.Interfaces;
using MePlusPlusBE.Models;
using Microsoft.AspNetCore.Mvc;

namespace MePlusPlusBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanController : Controller
    {
        private readonly IPlanRepository _planRepository;
        private readonly ILevelRepository _levelRepository;
        private readonly IUserRepository _userRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public PlanController(IPlanRepository planRepository, IMapper mapper, ILevelRepository levelRepository, IUserRepository userRepository, ICategoryRepository categoryRepository)
        {
            _planRepository = planRepository;
            _levelRepository = levelRepository;
            _categoryRepository = categoryRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpPost("addPlan")]
        public async Task<IActionResult> AddPlan([FromBody] NewPlan planDto)
        {
            try
            {
                if (planDto == null)
                {
                    return BadRequest("ModelState");
                }
                var level = await _levelRepository.GetLevelById(planDto.LevelId);
                if (level == null)
                {
                    return BadRequest("Level not found");

                }
                var category = await _categoryRepository.GetCategoryById(planDto.CategoryId);
                if (category == null)
                {
                    return BadRequest("Category not found");
                }
                var user = await _userRepository.GetUserData(planDto.UserId);
                if (user == null)
                {
                    return BadRequest("User not found");
                }


                var plan = _mapper.Map<Plan>(planDto);
                plan.Progressed = 0;
                plan.LastDateCompleted = DateOnly.FromDateTime(DateTime.Now); ;
                plan.StartDate = DateOnly.FromDateTime(DateTime.Now);
                plan.IsFreezed = false;
                plan.IsDone = false;
                if (!await _planRepository.AddNewPlan(plan))
                {
                    ModelState.AddModelError("", "Something went wrong while saving");
                    return BadRequest("Failed to add new plan");
                }
                return Ok("Successfully saved");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
    }
}
