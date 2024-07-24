using AutoMapper;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using DataModels = StudentAdminPortal.API.DataModels;
using StudentAdminPortal.API.DomainModels;
using StudentAdminPortal.API.Profiles.AfterMaps;

namespace StudentAdminPortal.API.Profiles
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<DataModels.Student, StudentDto>().ReverseMap();

            CreateMap<DataModels.Gender, GenderDto>().ReverseMap();

            CreateMap<DataModels.Address, AddressDto>().ReverseMap();

            CreateMap<UpdateStudentRequestDto, DataModels.Student>()
                .AfterMap<UpdateStudentRequestAfterMap>();
        }  
    }
}
