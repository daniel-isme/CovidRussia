using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CovidRussia.Models
{
    public class DailyStat
    {
        public Int32 RegionId { get; set; }

        public Region Region { get; set; }

        public Int32 StatsId { get; set; }

        public DateTime Date { get; set; }

        public Int32 NewCases { get; set; }

        public Int32 NewDeaths { get; set; }

        public Int32 NewRecovered { get; set; }
    }
}
