using MCVTask.Interface;
using MCVTask.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MCVTask.Services
{
    public class EmployeeService
    {
        private readonly IRepository<Employee> _Employee;

        public EmployeeService(IRepository<Employee> Employee)
        {
            _Employee = Employee;
        }
        //Get Employee Details By Employee Id  
        public IEnumerable<Employee> GetEmployeeById(int Id)
        {
            return _Employee.GetAll().Where(x => x.Id == Id).ToList();
        }
        //GET All Perso Details   
        public IEnumerable<Employee> GetAllEmployees()
        {
            try
            {
                return _Employee.GetAll().ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }
        //Get Employee by Employee Name  
        public Employee GetEmployeeByUserName(string Name)
        {
            return _Employee.GetAll().Where(x => x.Name == Name).FirstOrDefault();
        }
        //Add Employee  
        public async Task<Employee> AddEmployee(Employee Employee)
        {
            return await _Employee.Create(Employee);
        }
        //Delete Employee   
        public bool DeleteEmployee(int Id)
        {

            try
            {
                var DataList = _Employee.GetAll().Where(x => x.Id == Id).ToList();
                foreach (var item in DataList)
                {
                    _Employee.Delete(item);
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }

        }
        //Update Employee Details  
        public bool UpdateEmployee(Employee Employee)
        {
            try
            {
                _Employee.Update(Employee);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
