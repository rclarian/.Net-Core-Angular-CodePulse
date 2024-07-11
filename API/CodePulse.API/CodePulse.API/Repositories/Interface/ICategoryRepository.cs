using CodePulse.API.Models.Domain;

namespace CodePulse.API.Repositories.Interface
{
    //#29.Change POST Category Action method to use Repository
    public interface ICategoryRepository
    {
        Task<Category> CreateAsync(Category category);

        Task<IEnumerable<Category>> GetAllAsync();

        Task<Category?> GetById(Guid id);
    }
}
