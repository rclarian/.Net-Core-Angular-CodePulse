using Microsoft.AspNetCore.Mvc;
using StudentAdminPortal.API.DataModels;
using StudentAdminPortal.API.DomainModels;
using StudentAdminPortal.API.Repositories;

namespace StudentAdminPortal.API.Controllers
{
    [ApiController]
    public class StudentsController : Controller
    {
        private readonly IStudentRepository _studentRepository;

        public StudentsController(IStudentRepository studentRepository)
        {
            this._studentRepository = studentRepository;
        }

        //GET: http://localhost:5096/Students
        [HttpGet]
        [Route("[controller]")]
        public IActionResult GetAllStudents()
        {
            //Map domain model to Data model
            var students = _studentRepository.GetStudents();

            var domainModelStudents = new List<StudentDto>();

            foreach (var student in students) 
            {
                domainModelStudents.Add(new StudentDto()
                {
                    Id = student.Id,
                    FirstName = student.FirstName,
                    LastName = student.LastName,
                    DateOfBirth = student.DateOfBirth,
                    Email = student.Email,
                    Mobile = student.Mobile,
                    ProfileImageUrl = student.ProfileImageUrl,
                    GenderId = student.GenderId,
                    Address = new AddressDto()
                    {
                        Id = student.Address.Id,
                        PhysicalAddress = student.Address.PhysicalAddress,
                        PostalAddress = student.Address.PostalAddress,
                    },
                    Gender = new GenderDto()
                    {
                        Id = student.Gender.Id,
                        Description = student.Gender.Description
                    }
                });
            }

            return Ok(domainModelStudents);
        }
    }
}
