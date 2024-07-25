﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using StudentAdminPortal.API.DataModels;
using StudentAdminPortal.API.DomainModels;
using StudentAdminPortal.API.Repositories;

namespace StudentAdminPortal.API.Controllers
{
    [ApiController]
    public class GendersController : Controller
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IMapper _mapper;

        public GendersController(IStudentRepository studentRepository, IMapper mapper)
        {
            this._studentRepository = studentRepository;
            this._mapper = mapper;
        }

        //GET: http://localhost:5096/Genders
        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAllGenders()
        {
            var genderList = await _studentRepository.GetGendersAsync();

            if (genderList == null || !genderList.Any()) 
            {
                return NotFound();
            }

            return base.Ok(_mapper.Map<List<DomainModels.Gender>>(genderList));
        }
    }
}
