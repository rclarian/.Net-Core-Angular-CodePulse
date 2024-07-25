using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using DataModels = StudentAdminPortal.API.DataModels;
using DomainModels = StudentAdminPortal.API.DomainModels;
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
        public async Task<IActionResult> GetAllStudentsAsync()
        {
            var students = await _studentRepository.GetStudentsAsync();

            return Ok(_mapper.Map<List<DomainModels.Student>>(students));
        }

        //GET: http://localhost:5096/Students/99cfc907-1bbf-4023-b9a3-1151b2a487c2
        [HttpGet]
        [Route("[controller]/{studentId:guid}"), ActionName("GetStudentAsync")]
        public async Task<IActionResult> GetStudentAsync([FromRoute] Guid studentId)
        {
            //Fetch Student Details
            var student = await _studentRepository.GetStudentAsync(studentId);

            //Return Student
            if (student == null)
            {
                return NotFound();
            }

            var result = _mapper.Map<DomainModels.Student>(student);

            return Ok(result);
        }

        //PUT: http://localhost:5096/Students/99cfc907-1bbf-4023-b9a3-1151b2a487c2
        [HttpPut]
        [Route("[controller]/{studentId:guid}")]
        public async Task<IActionResult> UpdateStudentAsync([FromRoute] Guid studentId, [FromBody] DomainModels.UpdateStudentRequest request)
        {
            if (await _studentRepository.Exists(studentId))
            {
                var updateStuedent = await _studentRepository.UpdateStudent(studentId, _mapper.Map<DataModels.Student>(request));
                if (updateStuedent != null)
                {
                    return Ok(_mapper.Map<DomainModels.Student>(updateStuedent));
                }
            }
            return NotFound();
        }

        //DELETE: http://localhost:5096/Students/99cfc907-1bbf-4023-b9a3-1151b2a487c2
        [HttpDelete]
        [Route("[controller]/{studentId:guid}")]
        public async Task<IActionResult> DeleteStudentAsync([FromRoute] Guid studentId)
        {
            if (await _studentRepository.Exists(studentId))
            {
                //Delete student
                var student = await _studentRepository.DeleteStudent(studentId);
                return Ok(_mapper.Map<DomainModels.Student>(student));
            }

            return NotFound();
        }

        //Post: http://localhost:5096/Students/Add
        [HttpPost]
        [Route("[controller]/Add")]
        public async Task<IActionResult> AddStudentAsync([FromBody] DomainModels.AddStudentRequest request)
        {
            var student = await _studentRepository.AddStudent(_mapper.Map<DataModels.Student>(request));
            return CreatedAtAction(nameof(GetStudentAsync)
                , new { studentId = student.Id }
                , _mapper.Map<DomainModels.Student>(student));
        }


    }
}
