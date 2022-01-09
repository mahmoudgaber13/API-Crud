using MCVTask.Data;
using MCVTask.Interface;
using MCVTask.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MCVTask.Repository
{
    public class RepositoryDepartment : IRepository<Department>
    {
        ApplicationDbContext _dbContext;
        public RepositoryDepartment(ApplicationDbContext applicationDbContext)
        {
            _dbContext = applicationDbContext;
        }
        public async Task<Department> Create(Department _object)
        {
            var obj = await _dbContext.Departments.AddAsync(_object);
            _dbContext.SaveChanges();
            return obj.Entity;
        }

        public void Delete(Department _object)
        {
            _dbContext.Remove(_object);
            _dbContext.SaveChanges();
        }

        public IEnumerable<Department> GetAll()
        {
            try
            {
                return _dbContext.Departments.ToList();
            }
            catch (Exception ee)
            {
                throw;
            }
        }

        public Department GetById(int Id)
        {
            return _dbContext.Departments.Where(x => x.Id == Id).FirstOrDefault();
        }

        public void Update(Department _object)
        {
            _dbContext.Departments.Update(_object);
            _dbContext.SaveChanges();
        }
    }
}
