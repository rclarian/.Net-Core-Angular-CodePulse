using CodePulse.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Data
{
    //#21. Create DbContext Class
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<BlogImage> BlogImages { get; set; }
    }
}
