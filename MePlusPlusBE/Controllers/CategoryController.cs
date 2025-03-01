using AutoMapper;
using MePlusPlusBE.Dto;
using MePlusPlusBE.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MePlusPlusBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : Controller
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;


        public CategoryController(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;

        }
        //[HttpGet("/")]
        //public async Task<IActionResult> szia()
        //{
        //    return Ok();
        //}
        [HttpGet("getCategory")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = _mapper.Map<List<CategoryDto>>( await _categoryRepository.GetCategories());
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (categories != null)
            {
                return Ok(categories);
            }
            return NotFound();
        }
    }
}
