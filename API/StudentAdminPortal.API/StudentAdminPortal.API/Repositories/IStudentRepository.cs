﻿using StudentAdminPortal.API.DataModels;
using StudentAdminPortal.API.DomainModels;

namespace StudentAdminPortal.API.Repositories
{
    public interface IStudentRepository
    {
        Task<List<DataModels.Student>> GetStudentsAsync();
        Task<DataModels.Student> GetStudentAsync(Guid studentId);

        Task<List<DataModels.Gender>>GetGendersAsync();

        Task<bool> Exists(Guid studentId);

        Task<DataModels.Student> UpdateStudent(Guid studentId, DataModels.Student request);

        Task<DataModels.Student> DeleteStudent(Guid studentId);

        Task<DataModels.Student> AddStudent(DataModels.Student request);

        Task<bool> UpdateProfileImage(Guid studentId, string profileImageUrl);
    }
}
