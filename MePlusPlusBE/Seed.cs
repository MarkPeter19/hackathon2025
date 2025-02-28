using MePlusPlusBE.Data;
using MePlusPlusBE.Models;

namespace MePlusPlusBE
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedDataContext()
        {
            if (!_context.Categories.Any())
            {
                var categories = new List<Category>
                {
                    new Category()
                    {
                        Name = "Python",
                        Type = "Programming",
                    },
                    new Category()
                    {
                        Name = "C#",
                        Type = "Programming",
                    },
                    new Category()
                    {
                        Name = "Java",
                        Type = "Programming",
                    },
                    new Category()
                    {
                        Name = "Running",
                        Type = "Sport",
                    },
                    new Category()
                    {
                        Name = "Swimming",
                        Type = "Sport",
                    },
                    new Category()
                    {
                        Name = "Cycling",
                        Type = "Sport",
                    }
                };
                _context.Categories.AddRange(categories);
                _context.SaveChanges();
            }

            if (!_context.Levels.Any())
            {
                var levels = new List<Level>()
                {
                    new Level()
                    {
                        Name = "Bronz",
                    },
                    new Level()
                    {
                        Name = "Silver",
                    },
                    new Level()
                    {
                        Name = "Gold",
                    },
                    new Level()
                    {
                        Name = "Platinum",
                    },
                    new Level()
                    {
                        Name = "Diamond",
                    }
                };
                _context.Levels.AddRange(levels);
                _context.SaveChanges();
            }

            if (!_context.FlipCardLevels.Any())
            {
                var flipCardLevels = new List<FlipCardLevel>()
                {
                    new FlipCardLevel()
                    {
                        Name = "Bronz",
                    },
                    new FlipCardLevel()
                    {
                        Name = "Silver",
                    },
                    new FlipCardLevel()
                    {
                        Name = "Gold",
                    },
                    new FlipCardLevel()
                    {
                        Name = "Platinum",
                    },
                    new FlipCardLevel()
                    {
                        Name = "Diamond",
                    }
                };
                _context.FlipCardLevels.AddRange(flipCardLevels);
                _context.SaveChanges();
            }

            if (!_context.CheckQuests.Any())
            {
                var checkQuests = new List<CheckQuest>()
                {
                    new CheckQuest()
                    {
                        RecomendedActivity = "Run",
                        Mesure = "2 km"
                    },
                    new CheckQuest()
                    {
                        RecomendedActivity = "Swim",
                        Mesure = "1 km"
                    },
                    new CheckQuest()
                    {
                        RecomendedActivity = "practice",
                        Mesure = "1 hour"
                    },
                    new CheckQuest()
                    {
                        RecomendedActivity = "practice",
                        Mesure = "30 min"
                    },
                };
                _context.CheckQuests.AddRange(checkQuests);
                _context.SaveChanges();
            }

            if (!_context.Users.Any())
            {
                var users = new List<User>()
                {
                    new User()
                    {
                        PasswordHash = new byte[] { 0x1A, 0x2B, 0x3C, 0x4D },
                        PasswordSalt = new byte[] { 0x9A, 0x8B, 0x7C, 0x6D },
                        Email = "test@gmail.com",
                        FirtName = "TestFirstName",
                        LastName = "TestLastName",
                        XpLevel = 1,
                    }
                };
                _context.Users.AddRange(users);
                _context.SaveChanges();
            }

            if (!_context.Plans.Any())
            {
                var userPlans = new List<Plan>()
                {
                    new Plan()
                    {
                        User = _context.Users.First(u => u.Email == "test@gmail.com"),
                        Category = _context.Categories.First(c => c.Name == "Python"),
                        Level = _context.Levels.First(l => l.Name == "Bronz"),
                        Progressed = 1,
                        LastDateCompleted = DateOnly.FromDateTime(DateTime.Now),
                        StartDate = DateOnly.FromDateTime(DateTime.Now),
                        Duration = DateOnly.FromDateTime(DateTime.Now.AddDays(30)),
                        IsFreezed = false,
                        IsDone = false,
                        TimePerDay = TimeSpan.FromMinutes(30)
                    }
                };
                _context.Plans.AddRange(userPlans);
                _context.SaveChanges();
            }

            if (!_context.FlipCards.Any())
            {
                var flipCards = new List<FlipCard>()
                {
                    new FlipCard()
                    {
                        Question = "What is the output of print(2+3*5)",
                        AnswerOne = "25",
                        AnswerTwo = "18",
                        CorrectAnswer = "17",
                        FlipCardLevel = _context.FlipCardLevels.First(l => l.Name.Equals("Bronz"))
                    },
                    new FlipCard()
                    {
                        Question =  "What is the purpose of Python's GIL (Global Interpreter Lock)?",
                        AnswerOne = "It allows multiple threads to execute Python bytecode simultaneously.",
                        AnswerTwo = "It speeds up Python’s performance by enabling true parallel execution of threads.",
                        CorrectAnswer = "It prevents multiple threads from executing Python bytecode at the same time, ensuring thread safety.",
                        FlipCardLevel = _context.FlipCardLevels.First(l => l.Name.Equals("Bronz"))
                    },
                };
                _context.FlipCards.AddRange(flipCards);
                _context.SaveChanges();
            }

            if (!_context.Quests.Any())
            {
                var quests = new List<Quest>(){
                    {   
                        new Quest{
                        Plan = _context.Plans.First(p => p.Id == 2),
                        XpLevel = 1,
                        Date = DateOnly.FromDateTime(DateTime.Now),
                        CheckQuest = _context.CheckQuests.First(cq => cq.Id == 11),
                        IsDone = true 
                        }
                    }
                };
                _context.Quests.AddRange(quests);
                _context.SaveChanges();
            }
            if (!_context.FlipCardQuizzes.Any())
            {
                var flipCardQuizzes = new List<FlipCardQuiz>()
                {
                    new FlipCardQuiz()
                    {
                        FlipCard = _context.FlipCards.First(fc => fc.Question.Equals("What is the output of print(2+3*5)")),
                        Quest = _context.Quests.First(q => q.Plan.Equals(_context.Plans.First(p => p.Category.Name.Equals("Python")))),
                        AnsweredCorrectly = true,
                        UserAnswer = "17",
                    },
                    new FlipCardQuiz()
                    {
                        FlipCard = _context.FlipCards.First(fc => fc.Question.Equals("What is the purpose of Python's GIL (Global Interpreter Lock)?")),
                        Quest = _context.Quests.First(q => q.Plan.Equals(_context.Plans.First(p => p.Category.Name.Equals("Python")))),
                        AnsweredCorrectly = false,
                        UserAnswer = "It allows multiple threads to execute Python bytecode simultaneously.",
                    },
                };
                _context.FlipCardQuizzes.AddRange(flipCardQuizzes);
                _context.SaveChanges();
            }
            
        }

        public void UnseedDataContext()
        {
            // FlipCardQuizzes törlése
            _context.FlipCardQuizzes.RemoveRange(_context.FlipCardQuizzes);
            _context.SaveChanges();

            // FlipCards törlése
            _context.FlipCards.RemoveRange(_context.FlipCards);
            _context.SaveChanges();

            // Plans törlése
            _context.Plans.RemoveRange(_context.Plans);
            _context.SaveChanges();

            // Quests törlése
            _context.Quests.RemoveRange(_context.Quests);
            _context.SaveChanges();

            // CheckQuests törlése
            _context.CheckQuests.RemoveRange(_context.CheckQuests);
            _context.SaveChanges();

            // FlipCardLevels törlése
            _context.FlipCardLevels.RemoveRange(_context.FlipCardLevels);
            _context.SaveChanges();

            // Levels törlése
            _context.Levels.RemoveRange(_context.Levels);
            _context.SaveChanges();

            // Categories törlése
            _context.Categories.RemoveRange(_context.Categories);
            _context.SaveChanges();

            // Users törlése
            _context.Users.RemoveRange(_context.Users);
            _context.SaveChanges();

            Console.WriteLine("Seed data removed successfully.");
        }

    }
}