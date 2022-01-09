using MCVTask.Interface;
using MCVTask.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MCVTask.Services
{
    public class DepartmentService
    {
        private readonly IRepository<Department> _Department;

        public DepartmentService(IRepository<Department> Department)
        {
            _Department = Department;
        }
        //Get Department Details By Department Id  
        public IEnumerable<Department> GetDepartmentById(int Id)
        {
            return _Department.GetAll().Where(x => x.Id == Id).ToList();
        }
        //GET All Perso Details   
        public IEnumerable<Department> GetAllDepartments()
        {
            try
            {
                return _Department.GetAll().ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }
        //Get Department by Department Name  
        public Department GetDepartmentByName(string Name)
        {
            return _Department.GetAll().Where(x => x.Name == Name).FirstOrDefault();
        }
        //Add Department  
        public async Task<Department> AddDepartment(Department Department)
        {
            return await _Department.Create(Department);
        }
        //Delete Department   
        public bool DeleteDepartment(int Id)
        {
            try
            {
                var DataList = _Department.GetAll().Where(x => x.Id == Id).ToList();
                foreach (var item in DataList)
                {
                    _Department.Delete(item);
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }

        }
        //Update Department Details  
        public bool UpdateDepartment(Department Department)
        {
            try
            {
                _Department.Update(Department);

                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
