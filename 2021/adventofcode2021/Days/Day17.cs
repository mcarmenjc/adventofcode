using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace adventofcode2021.Days
{
    public class Day17 : Day
    {
        public override void Run()
        {
            PrintDayHeader(17);
            string targetRange = System.IO.File.ReadAllText(@".\Inputs\day17.txt");

            Match m = Regex.Match(targetRange, @"x=(\d+)..(\d+),\sy=(-\d+)..(-\d+)");

            List<int> xRange = new List<int>() { Int32.Parse(m.Groups[1].Value), Int32.Parse(m.Groups[2].Value) };
            xRange.Sort();
            List<int> yRange = new List<int>() { Int32.Parse(m.Groups[3].Value), Int32.Parse(m.Groups[4].Value) };
            yRange.Sort();

            int highestY = CalculateHighestYPosition(yRange);
            PrintPart(1, $"{highestY}");

            int numInitialVelocities = GetPossibleInitialVelocitiesToReachTarget(xRange, yRange);
            PrintPart(2, $"{numInitialVelocities}");
        }

        private int CalculateHighestYPosition(List<int> yRange)
        {
            int yVel = Math.Abs(yRange[0] + 1);
            int y = 0;

            while (y < y + yVel)
            {
                y = y + yVel;
                yVel--;
            }

            return y;
        }

        private int GetPossibleInitialVelocitiesToReachTarget(List<int> xRange, List<int> yRange)
        {
            HashSet<Tuple<int, int>> initialVelocities = new HashSet<Tuple<int, int>>();

            int minXVel = 1;
            while ((minXVel * (minXVel + 1)) / 2 < xRange[0])
            {
                minXVel++;
            }

            int maxYVel = Math.Abs(yRange[0] + 1);

            for (int x = minXVel; x <= xRange[1]; x++)
            {
                for (int y = yRange[0]; y <= maxYVel; y++)
                {
                    int xPos = 0;
                    int yPos = 0;
                    int xVel = x;
                    int yVel = y;
                    bool added = false;

                    while (xPos <= xRange[1] && yPos >= yRange[0] && !added)
                    {
                        xPos += xVel;
                        yPos += yVel;

                        if (xPos >= xRange[0] && xPos <= xRange[1] && yPos >= yRange[0] && yPos <= yRange[1])
                        {
                            initialVelocities.Add(new Tuple<int, int>(x, y));
                            added = true;
                        }

                        xVel += (xVel == 0) ? 0 : -1;
                        yVel--;
                    }
                }
            }

            return initialVelocities.Count;
        }
    }
}
