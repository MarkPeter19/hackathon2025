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
            CreateMap<Plan, PlanDto>();
            CreateMap<Quest, QuestDto>();
            CreateMap<User, UserDto>();
            CreateMap<CheckQuest, CheckQuestDto>();
            CreateMap<Level, LevelDto>();
            CreateMap<NewPlan, Plan>();
        }
    }
}
