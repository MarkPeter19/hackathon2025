using MePlusPlusBE.AIClient;
using MePlusPlusBE.AIModels;
using MePlusPlusBE.Data;
using MePlusPlusBE.Dto;
using MePlusPlusBE.Interfaces;
using MePlusPlusBE.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace MePlusPlusBE.Repository
{
    public class QuestRepository : IQuestRepository
    {
        private readonly DataContext _context;
        private GeminiApiClient _geminiApiClient;
        private ILogger<QuestRepository> _logger;
        public QuestRepository(DataContext context,GeminiApiClient geminiApiClient, ILogger<QuestRepository> logger)
        {
            _context = context;
            _geminiApiClient = geminiApiClient;
            _logger = logger;
        }
        public async Task<ICollection<Quest>?> GetDailyQuestsByPlanIds(List<int> planIds)
        {

            var quests = await _context.Quests
                .Where(q => planIds.Contains(q.PlanId) && q.Date == DateOnly.FromDateTime(DateTime.Now))
                //.Where(q => planIds.Contains(q.PlanId))
                .OrderBy(q => Guid.NewGuid())
                .Take(3)
                .ToListAsync();
            if (quests.Count != 0)
            {
                return quests;
            }
            else
            {
                List<int> generatedQuests = await GenerateQuests(planIds);
                if (generatedQuests == null)
                {
                    return null;
                }
                return await _context.Quests.Where(q => generatedQuests.Contains(q.Id)).ToListAsync();
            }
        }

        public async Task<List<int>> GenerateQuests(List<int> planIds)
        {
            List<Plan> plans = await _context.Plans.Where(p => planIds.Contains(p.Id)).ToListAsync();
            _logger.LogInformation("Cleaned response: {CleanedResponse}", plans);

            List<int> questIds = new List<int>();

            List<string> categories = new List<string>();
            foreach(Plan p in plans)
            {
                categories.Add(p.Category.Name);
            }


            PromptRequest prompt = new PromptRequest();
            prompt.Prompt = "Send me 2 quests in 2 category, choosed randomly from ";
            prompt.Prompt += string.Join(", ", categories);
            prompt.Prompt += " topics. the selectedCategoryFlip has nothing to do with the other checkQuests, it is exactly one category of your choice. the selectedCategoryFlip and the checkQuest categoryName should be from the given topics and their name should be exactly how it is written in this message.this is the format:{ selectedCategoryFlip : string (one category of your choice),  checkQuests: [{categoryName: string (chosen category),  recommendedActivity: string (an activity that helps the user improve in the given category, it should be a subject, one word, starting with uppercase),    measure: string (amount + the unit in which the user should perform this activity; for example, if it's programming, measure in hours or minutes; if it's sports, use kilometers—but these should be realistic values that an average person can achieve, so for example not greater than 2 hour coding, or not greater than 5 km running etc), xpLevel: int (an even number of your choice between 10 and 20), } ] }";
            
            var response = await _geminiApiClient.GenerateContentAsync(prompt.Prompt);

            //if (response == null)
            //{
            //    return null;
            //}

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
                    var generatedQuests = JsonConvert.DeserializeObject<NewQuest>(cleanedResponse);
                    if (generatedQuests != null)
                    {
                        // add to questIds the selectedCategoryFlip
                        int selectedCategory = await _context.Categories
                            .Where(c => c.Name == generatedQuests.SelectedCategoryFlip)
                            .Select(c => c.Id)
                            .FirstOrDefaultAsync();
                        
                        questIds.Add(selectedCategory);
                        Quest quest1 = new Quest()
                        {
                            XpLevel = 20,
                            Date = DateOnly.FromDateTime(DateTime.Now),
                            CheckQuestId = null,
                            PlanId = plans.Where(p => p.Category.Name == generatedQuests.SelectedCategoryFlip).FirstOrDefault().Id,
                            IsDone = false
                        };
                        int id = await AddQuest(quest1);
                        quest1.Id = id;

                        questIds.Add(quest1.Id);

                        foreach (var item in generatedQuests.CheckQuests)
                        {
                            CheckQuest checkQuest = new CheckQuest()
                            {
                                RecomendedActivity = item.RecommendedActivity,
                                Mesure = item.Measure
                            };
                            
                            int cId = await AddCheckQuest(checkQuest);
                            checkQuest.Id = cId;

                            Quest quest = new Quest
                            {
                                PlanId = plans.Where(p => p.Category.Name == item.CategoryName).FirstOrDefault().Id,
                                Date = DateOnly.FromDateTime(DateTime.Now),
                                IsDone = false,
                                CheckQuestId = checkQuest.Id,
                                XpLevel = item.XpLevel
                            };

                            id = await AddQuest(quest);
                            quest.Id = id;

                            questIds.Add(quest.Id);
                        }
                    }
                }
                catch (Exception ex)
                {
                    return null;
                }
            }
            return questIds;

        }

        public async Task<int> AddCheckQuest(CheckQuest checkQuest)
        {
            _context.CheckQuests.Add(checkQuest);
            if (await Save() == true)
            {
                return checkQuest.Id;
            }
            return 0;
        }

        public async Task<int> AddQuest(Quest quest)
        {
            _context.Quests.Add(quest);
            if (await Save() == true)
            {
                return quest.Id;
            }
            return 0;
        }

        public Task<bool> UpdateQuestDone(int questId)
        {
            var quest = _context.Quests.Where(q => q.Id == questId).FirstOrDefault();
            quest.IsDone = !quest.IsDone;
            _context.Update(quest);
            return Save();
        }

        public async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public Task<Quest?> GetQuestById(int questId)
        {
            return _context.Quests.Where(q => q.Id == questId).FirstOrDefaultAsync();
        }
    }
}
