using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Codvi.Models
{
    public class RegionTable
    {
        public String RegionName { get; set; }

        public Int32 Cases { get; set; }

        public Int32 Deaths { get; set; }

        public Int32 Recovered { get; set; }

        public Int32 LastCases { get; set; }

        public Int32 LastDeaths { get; set; }

        public Int32 LastRecovered { get; set; }

        public String LastUpdate { get; set; }
    }
}
