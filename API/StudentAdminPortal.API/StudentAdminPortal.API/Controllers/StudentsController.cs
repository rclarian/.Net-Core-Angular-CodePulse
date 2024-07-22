using AutoMapper;
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
        private readonly IMapper _mapper;

        public StudentsController(IStudentRepository studentRepository, IMapper mapper)
        {
            this._studentRepository = studentRepository;
            this._mapper = mapper;
        }

        //GET: http://localhost:5096/Students
        [HttpGet]
        [Route("[controller]")]
        public IActionResult GetAllStudents()
        {
            var students = _studentRepository.GetStudents();

            return Ok(_mapper.Map<List<StudentDto>>(students));
        }
    }
}
