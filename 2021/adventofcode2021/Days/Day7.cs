using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day7 : Day
    {
        public override void Run()
        {
            PrintDayHeader(7);
            string counters = System.IO.File.ReadAllText(@".\Inputs\day7.txt");
            IList<int> positions = counters.Split(",").Select(x => Int32.Parse(x)).ToList();

            int fuel = GetMinNumberOfFuelToAlignCrabSubmarines(positions);
            PrintPart(1, $"{fuel}");

            int fuelNonLinear = GetMinNumberOfFuelToAlignCrabSubmarinesNonLinear(positions);
            PrintPart(2, $"{fuelNonLinear}");
        }

        private int GetMinNumberOfFuelToAlignCrabSubmarines(IList<int> positions)
        {
            int minFuel = Int32.MaxValue;
            int minPos = positions.Min();
            int maxPos = positions.Max();

            for (int i = minPos; i <= maxPos; i++)
            {
                int fuel = 0;

                foreach(int pos in positions)
                {
                    fuel += Math.Abs(pos - i);
                }

                if (fuel < minFuel)
                {
                    minFuel = fuel;
                }
            }

            return minFuel;
        }

        private int GetMinNumberOfFuelToAlignCrabSubmarinesNonLinear(IList<int> positions)
        {
            int minFuel = Int32.MaxValue;
            int minPos = positions.Min();
            int maxPos = positions.Max();

            for (int i = minPos; i <= maxPos; i++)
            {
                int fuel = 0;

                foreach (int pos in positions)
                {
                    int n = Math.Abs(pos - i);
                    fuel += n*(n+1)/2;
                }

                if (fuel < minFuel)
                {
                    minFuel = fuel;
                }
            }

            return minFuel;
        }
    }
}
