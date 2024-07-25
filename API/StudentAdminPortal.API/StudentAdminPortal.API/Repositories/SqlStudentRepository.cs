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

        public async Task<List<Student>> GetStudentsAsync()
        {
            return await _dbContext.Student.Include(nameof(Gender)).Include(nameof(Address)).ToListAsync();
        }

        public async Task<Student> GetStudentAsync(Guid studentId)
        {
            var student = await _dbContext.Student.Include(nameof(Gender)).Include(nameof(Address)).FirstOrDefaultAsync(x => x.Id == studentId);

            if (student != null)
            {
                return student;
            }
            return null;
        }

        public async Task<List<Gender>> GetGendersAsync()
        {
            return await _dbContext.Gender.ToListAsync();
        }

        public async Task<bool> Exists(Guid studentId)
        {
            return await _dbContext.Student.AnyAsync(x => x.Id == studentId);
        }

        public async Task<Student> UpdateStudent(Guid studentId, Student request)
        {
            var existingStudent = await GetStudentAsync(studentId);

            if (existingStudent != null) 
            { 
                existingStudent.FirstName = request.FirstName;
                existingStudent.LastName = request.LastName;
                existingStudent.DateOfBirth = request.DateOfBirth;
                existingStudent.Email = request.Email;
                existingStudent.Mobile = request.Mobile;
                existingStudent.GenderId = request.GenderId;
                existingStudent.Address.PhysicalAddress = request.Address.PhysicalAddress;
                existingStudent.Address.PostalAddress = request.Address.PostalAddress;

                await _dbContext.SaveChangesAsync();
                return existingStudent;
            }
            return null;
        }

        public async Task<Student> DeleteStudent(Guid studentId)
        {
            var student = await GetStudentAsync(studentId);
            if (student != null) 
            {
                _dbContext.Student.Remove(student);
                await _dbContext.SaveChangesAsync();
                return student;
            }
            return null;
        }

        public async Task<Student> AddStudent(Student request)
        {
            var student = await _dbContext.Student.AddAsync(request);
            await _dbContext.SaveChangesAsync();
            return student.Entity;
        }
    }
}
