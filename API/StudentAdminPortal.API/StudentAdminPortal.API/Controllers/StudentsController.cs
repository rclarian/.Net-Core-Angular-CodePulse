using Microsoft.AspNetCore.Mvc;
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

        //GET: http://localhost:5019/Students
        [HttpGet]
        [Route("[controller]")]
        public IActionResult GetAllStudents()
        {
            var student = _studentRepository.GetStudents();
            return Ok(student);
        }
    }
}
