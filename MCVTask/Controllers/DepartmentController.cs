using MCVTask.Interface;
using MCVTask.Models;
using MCVTask.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MCVTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly DepartmentService _DepartmentService;

        private readonly IRepository<Department> _Department;

        public DepartmentController(IRepository<Department> Department, DepartmentService ProductService)
        {
            _DepartmentService = ProductService;
            _Department = Department;

        }
        //Add Department  
        [HttpPost("AddDepartment")]
        public async Task<Object> AddDepartment([FromBody] Department Department)
        {
            try
            {
                await _DepartmentService.AddDepartment(Department);
                return Ok(Department);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        //Delete Department  
        [HttpDelete("DeleteDepartment")]
        public bool DeleteDepartment(int Id)
        {
            try
            {
                _DepartmentService.DeleteDepartment(Id);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        //Delete Department  
        [HttpPut("UpdateDepartment")]
        public bool UpdateDepartment(Department Object)
        {
            try
            {
                _DepartmentService.UpdateDepartment(Object);
                return true;
            }
            catch (Exception)
            {
                return  false;
            }
        }
        //GET All Department by Name  
        [HttpGet("GetAllDepartmentByName")]
        public Object GetAllDepartmentByName(string Name)
        {
            var data = _DepartmentService.GetDepartmentByName(Name);
            var json = JsonConvert.SerializeObject(data, Formatting.Indented,
                new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                }
            );
            return json;
        }

        [HttpGet("GetDepartmentById")]
        public Object GetDepartmentById(int Id)
        {
            return _Department.GetById(Id);
        }

        //GET All Department  
        [HttpGet("GetAllDepartments")]
        public Object GetAllDepartments()
        {
            var data = _DepartmentService.GetAllDepartments();
            var json = JsonConvert.SerializeObject(data, Formatting.Indented,
                new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                }
            );
            return json;
        }
    }
}
