using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CovidRussia.Models
{
    public class Region
    {
        public Int32 Id { get; set; }

        [Required]
        [MaxLength(50)]
        public String Name { get; set; }

        public Boolean IsLockedDown { get; set; }

        public ICollection<DailyStat> DailyStats { get; set; }
    }
}
