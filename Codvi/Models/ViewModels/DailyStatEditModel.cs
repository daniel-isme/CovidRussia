using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Codvi.Models.ViewModels
{
    public class DailyStatEditModel
    {
        public DateTime Date { get; set; }

        public Int32 NewCases { get; set; }

        public Int32 NewDeaths { get; set; }

        public Int32 NewRecovered { get; set; }
    }
}
