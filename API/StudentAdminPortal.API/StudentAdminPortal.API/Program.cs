using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using StudentAdminPortal.API.DataModels;
using StudentAdminPortal.API.Repositories;
using FluentValidation;
using FluentValidation.AspNetCore;
using StudentAdminPortal.API.Validators;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Database injection
builder.Services.AddDbContext<StudentAdminContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("StudentAdminPortalDbConnection"));
});

//Implemention/Interface injection
builder.Services.AddScoped<IStudentRepository, SqlStudentRepository>();
builder.Services.AddScoped<IImageRepository, LocalStorageImageRepository>();

// Register AutoMapper
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// Add services to the container.
//builder.Services.AddControllers();

//builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Program>());

// Register FluentValidation
//builder.Services.AddFluentValidation(fv =>
//{
//    // Optionally enable automatic validation of controllers' actions parameters.
//    fv.AutomaticValidationEnabled = true;
//    // Optionally disable the built-in DataAnnotations-based validation.
//    fv.DisableDataAnnotationsValidation = true;
//});

// Configure FluentValidation
builder.Services.AddFluentValidationAutoValidation()
                .AddFluentValidationClientsideAdapters();

// Register your validators here
builder.Services.AddValidatorsFromAssemblyContaining<AddStudentRequestValidator>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//Fixed the issue related CORS
app.UseCors(options =>
options.WithOrigins("http://localhost:4200")
.AllowAnyMethod()
.AllowAnyHeader());


app.UseAuthorization();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Resources")),
    RequestPath = "/Resources"
});

app.MapControllers();

app.Run();
