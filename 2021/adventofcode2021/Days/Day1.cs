using System;
using System.Collections.Generic;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day1 : Day
    {
        public override void Run()
        {
            IList<int> depths = ParseFile();
            PrintDayHeader(1);

            int measurementsIncreases = GetNumberOfTimesMeasurementIncreases(depths);
            PrintPart(1, $"{measurementsIncreases}");
            int sumOfSlidingWindow = GetNumberOfTimesSumOfMeasurementsInSlidingWindowIncreases(depths);
            PrintPart(2, $"{sumOfSlidingWindow}");
        }

        private IList<int> ParseFile()
        {
            string[] lines = System.IO.File.ReadAllLines(@".\Inputs\day1.txt");
            IList<int> depths = new List<int>();

            foreach (string line in lines)
            {
                int depth = Int32.Parse(line);
                depths.Add(depth);
            }

            return depths;
        }

        private int GetNumberOfTimesMeasurementIncreases(IList<int> depths)
        {
            int increases = 0;
            
            for (int i = 0; i < depths.Count - 1; i++)
            {
                if (depths[i] < depths[i + 1])
                {
                    increases++;
                }
            }
            return increases;
        }

        private int GetNumberOfTimesSumOfMeasurementsInSlidingWindowIncreases(IList<int> depths)
        {
            int windowSize = 3;
            int increases = 0;
            int currentWindow = 0;
            
            for (int i = 0; i < depths.Count; i++)
            {
                if (i < windowSize)
                {
                    currentWindow += depths[i];
                }
                else
                {
                    int nextWindow = currentWindow - depths[i - windowSize] + depths[i];

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
