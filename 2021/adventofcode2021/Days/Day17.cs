using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace adventofcode2021.Days
{
    public class Day17
    {
        private List<int> _xRange;
        private List<int> _yRange;

        public Day17()
        {
            string targetRange = System.IO.File.ReadAllText(@".\Inputs\day17.txt");

            Match m = Regex.Match(targetRange, @"x=(\d+)..(\d+),\sy=(-\d+)..(-\d+)");

            if (m.Success)
            {
                _xRange = new List<int>() { Int32.Parse(m.Groups[1].Value), Int32.Parse(m.Groups[2].Value) };
                _xRange.Sort();
                _yRange = new List<int>() { Int32.Parse(m.Groups[3].Value), Int32.Parse(m.Groups[4].Value) };
                _yRange.Sort();
            }
        }

        public int CalculateHighesYPosition()
        {
            int yVel = Math.Abs(_yRange[0] + 1);
            int y = 0;

            while (y < y + yVel)
            {
                y = y + yVel;
                yVel--;
            }

            return y;
        }

        public int GetPossibleInitialVelocitiesToReachTarget()
        {
            HashSet<Tuple<int, int>> initialVelocities = new HashSet<Tuple<int, int>>();

            int minXVel = 1;
            while ((minXVel * (minXVel + 1)) / 2 < _xRange[0])
            {
                minXVel++;
            }

            int maxYVel = Math.Abs(_yRange[0] + 1);

            for (int x = minXVel; x <= _xRange[1]; x++)
            {
                for (int y = _yRange[0]; y <= maxYVel; y++)
                {
                    int xPos = 0;
                    int yPos = 0;
                    int xVel = x;
                    int yVel = y;
                    bool added = false;

                    while (xPos <= _xRange[1] && yPos >= _yRange[0] && !added)
                    {
                        xPos += xVel;
                        yPos += yVel;

                        if (xPos >= _xRange[0] && xPos <= _xRange[1] && yPos >= _yRange[0] && yPos <= _yRange[1])
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
