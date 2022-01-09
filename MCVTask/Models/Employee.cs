using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MCVTask.Models
{
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Display(Name = "Employee Name")]
        public string Name { get; set; }

        [Required]
        [Display(Name = "Employee birthdate")]
        public DateTime Birthdate { get; set; }

        [Required]
        [Display(Name = "Employee tilte")]
        public string Title { get; set; }

        [Required]
        [Display(Name = "Employee hiring date")]
        public DateTime HiringDate { get; set; }

        [Required]
        [Display(Name = "Department Id")]
        public int DepartmentId { get; set; }

        [Required]
        [Display(Name = "Department Name")]
        public string DepartmentName { get; set; }


        //public virtual Department Department { get; set; }


    }
}
