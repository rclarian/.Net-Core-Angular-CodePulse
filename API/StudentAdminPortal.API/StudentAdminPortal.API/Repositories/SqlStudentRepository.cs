using Microsoft.EntityFrameworkCore;
using StudentAdminPortal.API.DataModels;

namespace StudentAdminPortal.API.Repositories
{
    public class SqlStudentRepository : IStudentRepository
    {
        private readonly StudentAdminContext _dbContext;

        public SqlStudentRepository(StudentAdminContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public List<Student> GetStudents()
        {
            return _dbContext.Student.Include(nameof(Gender)).Include(nameof(Address)).ToList();
        }
    }
}
