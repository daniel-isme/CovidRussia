﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Codvi.DataConversion
{
    public class StatNormalizer
    {
        public class StatLocal
        {
            public DateTime Date;
            public int Cases;
            public int Deaths;
            public int Recovered;
        }
        public class RegLocal
        {
            public int Id;
            public string Name;
            public List<StatLocal> Stats;
        }

        public static List<RegLocal> Normalize(string readPath, string writePath)
        {
            // string to classes Region and Stat
            List<RegLocal> regions = new List<RegLocal>();

            Regex regionRegex = new Regex(@"[А-Я].*");

            //string text = "";
            string line, regName;

            StreamReader sr = new StreamReader(readPath, System.Text.Encoding.Default);
            while ((line = sr.ReadLine()) != null) // reading one line
            {
                if (line == "") continue;
                string[] stat = line.Split(' ');
                regName = regionRegex.Match(line).Value;
                bool regionExist = false;

                foreach (RegLocal region in regions)
                {
                    if (region.Name == regName)
                    {
                        regionExist = true;
                        break;
                    }
                }

                var newStat = new StatLocal
                {
                    Date = DateTime.ParseExact(stat[0], "dd.MM.yyyy", CultureInfo.InvariantCulture),
                    Cases = int.Parse(stat[1]),
                    Deaths = int.Parse(stat[3]),
                    Recovered = int.Parse(stat[2])
                };

                if (newStat.Date <= DateTime.ParseExact("04.04.2020", "dd.MM.yyyy", CultureInfo.InvariantCulture))
                {
                    var tmp = newStat.Deaths;
                    newStat.Deaths = newStat.Recovered;
                    newStat.Recovered = tmp;
                }

                if (regionExist)
                {
                    regions.First(i => i.Name == regName)
                        .Stats
                        .Add(newStat);
                }
                else
                {
                    regions.Add(new RegLocal
                    {
                        Name = regName,
                        Stats = new List<StatLocal> { newStat }
                    });
                }
            }

            // sum to delta
            foreach (RegLocal region in regions)
            {
                region.Stats = region.Stats.OrderByDescending(s => s.Date).ToList();

                for (int i = 0; i < region.Stats.Count - 1; i++)
                {
                    region.Stats[i].Cases -= region.Stats[i + 1].Cases;
                    region.Stats[i].Deaths -= region.Stats[i + 1].Deaths;
                    region.Stats[i].Recovered -= region.Stats[i + 1].Recovered;

                    if (region.Stats[i].Cases < 0) region.Stats[i].Cases = 0;
                    if (region.Stats[i].Deaths < 0) region.Stats[i].Deaths = 0;
                    if (region.Stats[i].Recovered < 0) region.Stats[i].Recovered = 0;
                }

                //for (int i = region.Stats.Count - 1; i > 0; i--)
                //{
                //    for (int j = i - 1; j >= 0; j--)
                //    {
                //        region.Stats[j].Cases -= region.Stats[i].Cases;
                //        region.Stats[j].Deaths -= region.Stats[i].Deaths;
                //        region.Stats[j].Recovered -= region.Stats[i].Recovered;
                //    }
                //}
            }

            // remove all zero stats
            foreach (RegLocal region in regions)
            {
                for (int i = region.Stats.Count - 1; i >= 0; i--)
                {
                    if (region.Stats[i].Cases == 0
                        && region.Stats[i].Deaths == 0
                        && region.Stats[i].Recovered == 0)
                    {
                        region.Stats.RemoveAt(i);
                    }
                }
            }

            //Console.OutputEncoding = Encoding.UTF8;
            //// classes to text
            //foreach (Region region in regions)
            //{
            //    text += region.Name + "\n";
            //    foreach (Stat stat in region.Stats)
            //    {
            //        text += $"{stat.Date} {stat.Cases} {stat.Deaths} {stat.Recovered}\n";
            //    }
            //    text += "\n\n";
            //}

            //File.WriteAllText(writePath, text);

            Regex idRegex = new Regex(@"\d*");
            int id;
            sr = new StreamReader(@"C:\Users\danii\source\repos\Sandbox\Sandbox\AllDataFiles\TextData\all_regions_list.txt", System.Text.Encoding.Default);
            while ((line = sr.ReadLine()) != null) // reading one line
            {
                if (line == "") continue;
                regName = regionRegex.Match(line).Value;
                id = int.Parse(idRegex.Match(line).Value);
                //bool regionExist = false;

                foreach (RegLocal region in regions)
                {
                    if (region.Name == regName)
                    {
                        //regionExist = true;
                        region.Id = id;
                        //Console.WriteLine($"{region.Id}  {region.Name}");
                        break;
                    }
                }

                //if (regionExist)
                //{
                //    num++;
                //}
                //else
                //{
                //    // Console.WriteLine($"{regName}");
                //}
            }
            //Console.WriteLine($"{num} matches");


            return regions;
        }
    }
}