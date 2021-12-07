using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day7
    {
        IList<int> _positions;
        public Day7()
        {
            string counters = System.IO.File.ReadAllText(@".\Inputs\day7.txt");
            _positions = counters.Split(",").Select(x => Int32.Parse(x)).ToList();
        }

        public int GetMinNumberOfFuelToAlignCrabSubmarines()
        {
            int minFuel = Int32.MaxValue;
            int minPos = _positions.Min();
            int maxPos = _positions.Max();

            for (int i = minPos; i <= maxPos; i++)
            {
                int fuel = 0;

                foreach(int pos in _positions)
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

        public int GetMinNumberOfFuelToAlignCrabSubmarinesNonLinear()
        {
            int minFuel = Int32.MaxValue;
            int minPos = _positions.Min();
            int maxPos = _positions.Max();

            for (int i = minPos; i <= maxPos; i++)
            {
                int fuel = 0;

                foreach (int pos in _positions)
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
