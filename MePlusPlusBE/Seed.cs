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
                        IconName = "code"
                    },
                    new Category()
                    {
                        Name = "Flutter",
                        Type = "Programming",
                        IconName = "cloud"
                    },
                    new Category()
                    {
                        Name = "Java",
                        Type = "Programming",
                        IconName = "coffee"
                    },
                    new Category()
                    {
                        Name = "React Native",
                        Type = "Programming",
                        IconName = "mobile"
                    },
                     new Category()
                    {
                        Name = "React",
                        Type = "Programming",
                        IconName = "atom"
                    },
                      new Category()
                    {
                        Name = "NodeJs",
                        Type = "Programming",
                        IconName = "server"
                    },
                       new Category()
                    {
                        Name = "Android",
                        Type = "Programming",
                        IconName = "android"
                    },
                    new Category()
                    {
                        Name = "Running",
                        Type = "Sport",
                        IconName = "running"
                    },
                    new Category()
                    {
                        Name = "Swimming",
                        Type = "Sport",
                        IconName = "person-swimming"
                    },
                    new Category()
                    {
                        Name = "Cycling",
                        Type = "Sport",
                        IconName = "bicycle"
                    },
                    new Category()
                    {
                        Name = "Football",
                        Type = "Sport",
                        IconName = "futbol-o"
                    }
                };
                _context.Categories.AddRange(categories);
                _context.SaveChanges();
            }

            if (!_context.FlipCardCategories.Any())
            {
                var categories = new List<FlipCardCategory>
                {
                    new FlipCardCategory()
                    {
                        Name = "Python",
                        Type = "Programming",
                        IconName = "code"
                    },
                    new FlipCardCategory()
                    {
                        Name = "Flutter",
                        Type = "Programming",
                        IconName = "cloud"
                    },
                    new FlipCardCategory()
                    {
                        Name = "Java",
                        Type = "Programming",
                        IconName = "coffee"
                    },
                    new FlipCardCategory()
                    {
                        Name = "React Native",
                        Type = "Programming",
                        IconName = "mobile"
                    },
                     new FlipCardCategory()
                    {
                        Name = "React",
                        Type = "Programming",
                        IconName = "atom"
                    },
                      new FlipCardCategory()
                    {
                        Name = "NodeJs",
                        Type = "Programming",
                        IconName = "server"
                    },
                       new FlipCardCategory()
                    {
                        Name = "Android",
                        Type = "Programming",
                        IconName = "android"
                    },
                    new FlipCardCategory()
                    {
                        Name = "Running",
                        Type = "Sport",
                        IconName = "running"
                    },
                    new FlipCardCategory()
                    {
                        Name = "Swimming",
                        Type = "Sport",
                        IconName = "person-swimming"
                    },
                    new FlipCardCategory()
                    {
                        Name = "Cycling",
                        Type = "Sport",
                        IconName = "bicycle"
                    },
                    new FlipCardCategory()
                    {
                        Name = "Football",
                        Type = "Sport",
                        IconName = "futbol-o"
                    }
                };
                _context.FlipCardCategories.AddRange(categories);
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
                    },
                    new Plan()
                    {
                        User = _context.Users.First(u => u.Email == "test@gmail.com"),
                        Category = _context.Categories.First(c => c.Name == "NodeJs"),
                        Level = _context.Levels.First(l => l.Name == "Silver"),
                        Progressed = 10,
                        LastDateCompleted = DateOnly.FromDateTime(DateTime.Now),
                        StartDate = DateOnly.FromDateTime(DateTime.Now),
                        Duration = DateOnly.FromDateTime(DateTime.Now.AddDays(30)),
                        IsFreezed = false,
                        IsDone = false,
                        TimePerDay = TimeSpan.FromMinutes(30)
                    },
                    new Plan()
                    {
                        User = _context.Users.First(u => u.Email == "test@gmail.com"),
                        Category = _context.Categories.First(c => c.Name == "Running"),
                        Level = _context.Levels.First(l => l.Name == "Gold"),
                        Progressed = 20,
                        LastDateCompleted = DateOnly.FromDateTime(DateTime.Now),
                        StartDate = DateOnly.FromDateTime(DateTime.Now),
                        Duration = DateOnly.FromDateTime(DateTime.Now.AddDays(30)),
                        IsFreezed = false,
                        IsDone = false,
                        TimePerDay = TimeSpan.FromMinutes(30)
                    },
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
                        FlipCardLevel = _context.FlipCardLevels.First(l => l.Name.Equals("Bronz")),
                        FlipCardCategory = _context.FlipCardCategories.First(fc => fc.Name.Equals("Python"))
                    },
                    new FlipCard()
                    {
                        Question = "What is the purpose of Python's GIL (Global Interpreter Lock)?",
                        AnswerOne = "It allows multiple threads to execute Python bytecode simultaneously.",
                        AnswerTwo = "It speeds up Python’s performance by enabling true parallel execution of threads.",
                        CorrectAnswer = "It prevents multiple threads from executing Python bytecode at the same time, ensuring thread safety.",
                        FlipCardLevel = _context.FlipCardLevels.First(l => l.Name.Equals("Bronz")),
                        FlipCardCategory = _context.FlipCardCategories.First(fc => fc.Name.Equals("Python"))
                    },
                    new FlipCard()
                    {
                        Question = "What is the result of 10 // 3 in Python?",
                        AnswerOne = "3.33",
                        AnswerTwo = "4",
                        CorrectAnswer = "3",
                        FlipCardLevel = _context.FlipCardLevels.First(l => l.Name.Equals("Bronz")),
                        FlipCardCategory = _context.FlipCardCategories.First(fc => fc.Name.Equals("Python"))
                    },
                    new FlipCard()
                    {
                        Question = "Which keyword is used to define a function in Python?",
                        AnswerOne = "function",
                        AnswerTwo = "define",
                        CorrectAnswer = "def",
                        FlipCardLevel = _context.FlipCardLevels.First(l => l.Name.Equals("Bronz")),
                        FlipCardCategory = _context.FlipCardCategories.First(fc => fc.Name.Equals("Python"))
                    },
                    new FlipCard()
                    {
                        Question = "How do you open a file in Python for reading?",
                        AnswerOne = "file('myfile.txt', 'r')",
                        AnswerTwo = "open('myfile.txt', 'w')",
                        CorrectAnswer = "open('myfile.txt', 'r')",
                        FlipCardLevel = _context.FlipCardLevels.First(l => l.Name.Equals("Bronz")),
                        FlipCardCategory = _context.FlipCardCategories.First(fc => fc.Name.Equals("Python"))
                    },
                    new FlipCard()
                    {
                        Question = "What is the correct way to create a set in Python?",
                        AnswerOne = "[1, 2, 3]",
                        AnswerTwo = "set(1, 2, 3)",
                        CorrectAnswer = "{1, 2, 3}",
                        FlipCardLevel = _context.FlipCardLevels.First(l => l.Name.Equals("Bronz")),
                        FlipCardCategory = _context.FlipCardCategories.First(fc => fc.Name.Equals("Python"))
                    },
                    new FlipCard()
                    {
                        Question = "Which of the following is used to handle exceptions in Python?",
                        AnswerOne = "catch...throw",
                        AnswerTwo = "try...finally",
                        CorrectAnswer = "try...except",
                        FlipCardLevel = _context.FlipCardLevels.First(l => l.Name.Equals("Bronz")),
                        FlipCardCategory = _context.FlipCardCategories.First(fc => fc.Name.Equals("Python"))
                    },
                    new FlipCard()
                    {
                        Question = "What will be the output of len([1, 2, 3, 4])?",
                        AnswerOne = "3",
                        AnswerTwo = "5",
                        CorrectAnswer = "4",
                        FlipCardLevel = _context.FlipCardLevels.First(l => l.Name.Equals("Bronz")),
                        FlipCardCategory = _context.FlipCardCategories.First(fc => fc.Name.Equals("Python"))
                    },
                    new FlipCard()
                    {
                        Question = "How do you declare a variable in Python?",
                        AnswerOne = "int x = 10;",
                        AnswerTwo = "var x = 10;",
                        CorrectAnswer = "x = 10",
                        FlipCardLevel = _context.FlipCardLevels.First(l => l.Name.Equals("Bronz")),
                        FlipCardCategory = _context.FlipCardCategories.First(fc => fc.Name.Equals("Python"))
                    },
                    new FlipCard()
                    {
                        Question = "What is the correct way to write a comment in Python?",
                        AnswerOne = "// This is a comment",
                        AnswerTwo = "/* This is a comment */",
                        CorrectAnswer = "# This is a comment",
                        FlipCardLevel = _context.FlipCardLevels.First(l => l.Name.Equals("Bronz")),
                        FlipCardCategory = _context.FlipCardCategories.First(fc => fc.Name.Equals("Python"))
                    },
                    new FlipCard()
                    {
                        Question = "What does the 'elif' keyword do in Python?",
                        AnswerOne = "It starts a new function definition.",
                        AnswerTwo = "It defines a new loop condition.",
                        CorrectAnswer = "It provides an alternative condition in an if-else statement.",
                        FlipCardLevel = _context.FlipCardLevels.First(l => l.Name.Equals("Bronz")),
                        FlipCardCategory = _context.FlipCardCategories.First(fc => fc.Name.Equals("Python"))
                    },
                    new FlipCard()
                    {
                        Question = "Which built-in function can be used to get the length of a string in Python?",
                        AnswerOne = "size()",
                        AnswerTwo = "length()",
                        CorrectAnswer = "len()",
                        FlipCardLevel = _context.FlipCardLevels.First(l => l.Name.Equals("Bronz")),
                        FlipCardCategory = _context.FlipCardCategories.First(fc => fc.Name.Equals("Python"))
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
                        Plan = _context.Plans.First(p => p.Id == 3),
                        XpLevel = 20,
                        Date = DateOnly.FromDateTime(DateTime.Now),
                        CheckQuest = _context.CheckQuests.First(cq => cq.Id == 1),
                        IsDone = true 
                        }
                    },
                    new Quest{
                        Plan = _context.Plans.First(p => p.Id == 1),
                        XpLevel = 10,
                        Date = DateOnly.FromDateTime(DateTime.Now),
                        CheckQuest = null,
                        IsDone = true
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
                        UserAnswer = _context.FlipCards.First(fc => fc.Id == 1).AnswerOne,
                    },
                    new FlipCardQuiz()
                    {
                        FlipCard = _context.FlipCards.First(fc => fc.Question.Equals("What is the purpose of Python's GIL (Global Interpreter Lock)?")),
                        Quest = _context.Quests.First(q => q.Plan.Equals(_context.Plans.First(p => p.Category.Name.Equals("Python")))),
                        AnsweredCorrectly = false,
                        UserAnswer = _context.FlipCards.First(fc => fc.Id == 2).CorrectAnswer,
                    },
                    new FlipCardQuiz()
                    {
                        FlipCard = _context.FlipCards.First(fc => fc.Question.Equals("What is the result of 10 // 3 in Python?")),
                        Quest = _context.Quests.First(q => q.Plan.Equals(_context.Plans.First(p => p.Category.Name.Equals("Python")))),
                        AnsweredCorrectly = false,
                        UserAnswer = _context.FlipCards.First(fc => fc.Id == 3).AnswerTwo,
                    },
                    new FlipCardQuiz()
                    {
                        FlipCard = _context.FlipCards.First(fc => fc.Question.Equals("Which keyword is used to define a function in Python?")),
                        Quest = _context.Quests.First(q => q.Plan.Equals(_context.Plans.First(p => p.Category.Name.Equals("Python")))),
                        AnsweredCorrectly = true,
                        UserAnswer = _context.FlipCards.First(fc => fc.Id == 4).CorrectAnswer,
                    },
                    new FlipCardQuiz()
                    {
                        FlipCard = _context.FlipCards.First(fc => fc.Question.Equals("How do you open a file in Python for reading?")),
                        Quest = _context.Quests.First(q => q.Plan.Equals(_context.Plans.First(p => p.Category.Name.Equals("Python")))),
                        AnsweredCorrectly = false,
                        UserAnswer = _context.FlipCards.First(fc => fc.Id == 5).AnswerTwo,
                    },
                    new FlipCardQuiz()
                    {
                        FlipCard = _context.FlipCards.First(fc => fc.Question.Equals("What is the correct way to create a set in Python?")),
                        Quest = _context.Quests.First(q => q.Plan.Equals(_context.Plans.First(p => p.Category.Name.Equals("Python")))),
                        AnsweredCorrectly = true,
                        UserAnswer = _context.FlipCards.First(fc => fc.Id == 6).CorrectAnswer,
                    },
                    new FlipCardQuiz()
                    {
                        FlipCard = _context.FlipCards.First(fc => fc.Question.Equals("Which of the following is used to handle exceptions in Python?")),
                        Quest = _context.Quests.First(q => q.Plan.Equals(_context.Plans.First(p => p.Category.Name.Equals("Python")))),
                        AnsweredCorrectly = false,
                        UserAnswer = _context.FlipCards.First(fc => fc.Id == 7).AnswerOne,
                    },
                    new FlipCardQuiz()
                    {
                        FlipCard = _context.FlipCards.First(fc => fc.Question.Equals("What will be the output of len([1, 2, 3, 4])?")),
                        Quest = _context.Quests.First(q => q.Plan.Equals(_context.Plans.First(p => p.Category.Name.Equals("Python")))),
                        AnsweredCorrectly = true,
                        UserAnswer = _context.FlipCards.First(fc => fc.Id == 8).CorrectAnswer,
                    },
                    new FlipCardQuiz()
                    {
                        FlipCard = _context.FlipCards.First(fc => fc.Question.Equals("How do you declare a variable in Python?")),
                        Quest = _context.Quests.First(q => q.Plan.Equals(_context.Plans.First(p => p.Category.Name.Equals("Python")))),
                        AnsweredCorrectly = false,
                        UserAnswer = _context.FlipCards.First(fc => fc.Id == 9).AnswerOne,
                    },
                    new FlipCardQuiz()
                    {
                        FlipCard = _context.FlipCards.First(fc => fc.Question.Equals("What is the correct way to write a comment in Python?")),
                        Quest = _context.Quests.First(q => q.Plan.Equals(_context.Plans.First(p => p.Category.Name.Equals("Python")))),
                        AnsweredCorrectly = true,
                        UserAnswer = _context.FlipCards.First(fc => fc.Id == 10).CorrectAnswer,
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