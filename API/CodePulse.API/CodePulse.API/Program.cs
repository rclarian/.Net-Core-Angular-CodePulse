using CodePulse.API.Data;
using CodePulse.API.Repositories.Implementation;
using CodePulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//DB injection
builder.Services.AddDbContext<ApplicationDbContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("CodePulseConnectionString"));
});

//Implemention injection
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IBlogPostRepository, BlogPostRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//app.UseCors(options =>
//{
//    options.AllowAnyHeader();
//    options.AllowAnyOrigin();
//    options.AllowAnyMethod();
//});

//Fixed the issue related CORS
app.UseCors(options =>
options.WithOrigins("http://localhost:4200")
.AllowAnyMethod()
.AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.Run();
