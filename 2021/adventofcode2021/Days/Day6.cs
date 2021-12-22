using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day6 : Day
    {
        private List<int> _counters;
        public override void Run()
        {
            PrintDayHeader(6);
            List<int> counters = System.IO.File.ReadAllText(@".\Inputs\day6.txt").Split(",").Select(x => Int32.Parse(x)).ToList();
            long lanternFish = GetNumberOfLanternfistAfterXDays(80, counters);
            PrintPart(1, $"{lanternFish}");

            lanternFish = GetNumberOfLanternfistAfterXDays(256, counters);
            PrintPart(2, $"{lanternFish}");
        }

        private long GetNumberOfLanternfistAfterXDays(int days, List<int> counters)
        {
            IDictionary<int, long> timers = new Dictionary<int, long>();
            for (int i = 0; i <= 8; i++)
            {
                timers.Add(i, 0);
            }

            foreach (int c in counters)
            {
                timers[c]++;
            }

            for (int i = 0; i < days; i++)
            {
                IDictionary<int, long> newTimers = new Dictionary<int, long>();
                
                for (int j = 8; j >= 0; j--)
                {
                    if (j > 0)
                    {
                        newTimers.Add(j - 1, timers[j]);
                    }
                    else
                    {
                        newTimers[6] += timers[j];
                        newTimers.Add(8, timers[j]);
                    }
                }

                timers = newTimers;
            }

            long numLanternfish = 0;

            for (int i = 0; i <= 8; i++)
            {
                numLanternfish += timers[i];
            }

            return numLanternfish;
        }
    }
}
