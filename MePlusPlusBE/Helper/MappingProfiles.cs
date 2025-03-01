using AutoMapper;
using MePlusPlusBE.Dto;
using MePlusPlusBE.Models;

namespace MePlusPlusBE.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Category, CategoryDto>();
        }
    }
}
