using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CovidRussia.Models.ViewModels
{
    public class RegionEditModel
    {
        [Required]
        [MaxLength(50)]
        public String Name { get; set; }

        public Boolean IsLockedDown { get; set; }
    }
}
