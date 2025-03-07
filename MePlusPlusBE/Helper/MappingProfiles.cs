﻿using AutoMapper;
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
            CreateMap<FlipCard, QuizDto>();
            CreateMap<QuizDto, FlipCard>();
            CreateMap<NewPlan, Plan>();
            CreateMap<CorrectedResponse, CorrectedResponse>();
        }
    }
}
