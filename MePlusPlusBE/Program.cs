using MePlusPlusBE;
using MePlusPlusBE.AIClient;
using MePlusPlusBE.Data;
using MePlusPlusBE.Interfaces;
using MePlusPlusBE.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddTransient<Seed>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddTransient<ICategoryRepository, CategoryRsepository>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IQuestRepository, QuestRepository>();
builder.Services.AddTransient<IPlanRepository, PlanRepository>();
builder.Services.AddTransient<ICheckQuestRepository, CheckQuestRepository>();
builder.Services.AddTransient<ILevelRepository, LevelRepository>();
builder.Services.AddTransient<IQuizRepository, QuizRepository>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddLogging();
string apiKey = builder.Configuration["ApiKeys:GeminiApiKey"];
builder.Services.AddSingleton(new GeminiApiClient(apiKey));

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
});
var app = builder.Build();

// Seed data
if (args.Length == 1 && args[0] == "seeddata")
{
    SeedData(app);
}

void SeedData(IHost app)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();
    using (var scope = scopedFactory.CreateScope())
    {
        var seed = scope.ServiceProvider.GetService<Seed>();
        seed.SeedDataContext();
    }
}

if (args.Length == 1 && args[0] == "unseeddata")
{
    UnseedData(app);
}

void UnseedData(IHost app)
{
    using var scope = app.Services.CreateScope();
    var seed = scope.ServiceProvider.GetRequiredService<Seed>();
    seed.UnseedDataContext();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
