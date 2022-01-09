using MCVTask.Data;
using MCVTask.Interface;
using MCVTask.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MCVTask.Repository
{
    public class RepositoryEmployee : IRepository<Employee>
    {
        ApplicationDbContext _dbContext;
        public RepositoryEmployee(ApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }
        public async Task<Employee> Create(Employee _object)
        {
            var obj = await _dbContext.Employees.AddAsync(_object);
            _dbContext.SaveChanges();
            return obj.Entity;
        }

        public void Delete(Employee _object)
        {
            _dbContext.Remove(_object);
            _dbContext.SaveChanges();
        }

        public IEnumerable<Employee> GetAll()
        {
            try
            {
                return _dbContext.Employees.ToList();
            }
            catch (Exception ee)
            {
                throw;
            }
        }

        public Employee GetById(int Id)
        {
            return _dbContext.Employees.Where(x => x.Id == Id).FirstOrDefault();
        }

        public void Update(Employee _object)
        {
            _dbContext.Employees.Update(_object);
            _dbContext.SaveChanges();
        }
    }
}
