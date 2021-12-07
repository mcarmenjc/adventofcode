using System;
using System.Collections.Generic;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day1
    {
        private IList<int> _depths = new List<int>();

        public Day1()
        {
            string[] lines = System.IO.File.ReadAllLines(@".\Inputs\day1.txt");

            foreach(string line in lines)
            {
                int depth = Int32.Parse(line);
                _depths.Add(depth);
            }
        }

        public int GetNumberOfTimesMeasurementIncreases()
        {
            int increases = 0;
            
            for (int i = 0; i < _depths.Count - 1; i++)
            {
                if (_depths[i] < _depths[i + 1])
                {
                    increases++;
                }
            }
            return increases;
        }

        public int GetNumberOfTimesSumOfMeasurementsInSlidingWindowIncreases()
        {
            int windowSize = 3;
            int increases = 0;
            int currentWindow = 0;
            
            for (int i = 0; i < _depths.Count; i++)
            {
                if (i < windowSize)
                {
                    currentWindow += _depths[i];
                }
                else
                {
                    int nextWindow = currentWindow - _depths[i - windowSize] + _depths[i];

                    if (currentWindow < nextWindow)
                    {
                        increases++;
                    }
                    currentWindow = nextWindow;
                }
            }

            return increases;
        }
    }
}
