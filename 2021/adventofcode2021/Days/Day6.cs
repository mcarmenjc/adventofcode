using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day6
    {
        private List<int> _counters;
        public Day6()
        {
            string counters = System.IO.File.ReadAllText(@".\Inputs\day6.txt");
            _counters = counters.Split(",").Select(x => Int32.Parse(x)).ToList();
        }

        public long GetNumberOfLanternfistAfterXDays(int days)
        {
            IDictionary<int, long> timers = new Dictionary<int, long>();
            for (int i = 0; i <= 8; i++)
            {
                timers.Add(i, 0);
            }

            foreach (int c in _counters)
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

        public static void Print()
        {
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.Write("                       '     ");
            Console.ForegroundColor = ConsoleColor.DarkYellow;
            Console.Write(":                     ");
            Console.ForegroundColor = ConsoleColor.White;
            Console.Write(" 6 ");
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("**");
        }
    }
}
