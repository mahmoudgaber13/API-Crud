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
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _EmployeeService;

        private readonly IRepository<Employee> _Employee;

        public EmployeeController(IRepository<Employee> Employee, EmployeeService ProductService)
        {
            _EmployeeService = ProductService;
            _Employee = Employee;

        }
        //Add Employee  
        [HttpPost("AddEmployee")]
        public async Task<Object> AddEmployee([FromBody] Employee Employee)
        {
            try
            {
                await _EmployeeService.AddEmployee(Employee);
                return Ok(Employee);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        //Delete Employee  
        [HttpDelete("DeleteEmployee")]
        public bool DeleteEmployee(int Id)
        {
            try
            {
                _EmployeeService.DeleteEmployee(Id);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        //Update Employee  
        [HttpPut("UpdateEmployee")]
        public bool UpdateEmployee(Employee Object)
        {
            try
            {
                _EmployeeService.UpdateEmployee(Object);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        //GET All Employee by Name  
        [HttpGet("GetAllEmployeeByName")]
        public Object GetAllEmployeeByName(string Name)
        {
            var data = _EmployeeService.GetEmployeeByUserName(Name);
            var json = JsonConvert.SerializeObject(data, Formatting.Indented,
                new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                }
            );
            return json;
        }

        //GET Employee by Id  
        [HttpGet("GetEmployeeById")]
        public Object GetEmployeeById(int Id)
        {
            return _Employee.GetById(Id);
        }

        //GET All Employee  
        [HttpGet("GetAllEmployees")]
        public Object GetAllEmployees()
        {
            var data = _EmployeeService.GetAllEmployees();
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
