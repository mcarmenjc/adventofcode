using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day5 : Day
    {
        public class Point
        {
            public int X { get; set; }
            public int Y { get; set; }

            public static Point Parse(string point)
            {
                string[] parts = point.Split(",");
                Point newPoint = new Point()
                {
                    X = Int32.Parse(parts[0]),
                    Y = Int32.Parse(parts[1]),
                };

                return newPoint;
            }
        }

        public class Line
        {
            public Point Start { get; set; }
            public Point End { get; set; }

            public bool IsHorizontal()
            {
                return Start.Y == End.Y;
            }

            public bool IsVertical()
            {
                return Start.X == End.X;
            }

            public static Line Parse(string line)
            {
                string[] parts = line.Split(" -> ");
                Line newLine = new Line()
                {
                    Start = Point.Parse(parts[0]),
                    End = Point.Parse(parts[1])
                };

                return newLine;
            }
        }

        public override void Run()
        {
            PrintDayHeader(5);

            IList<Line> lines = System.IO.File.ReadAllLines(@".\Inputs\day5.txt").Select(x => Line.Parse(x)).ToList();

            int[][] currentsMap = CreateFreeCurrentsMap(lines);

            foreach (Line l in lines)
            {
                if (l.IsHorizontal() || l.IsVertical())
                {
                    IncreaseValuesForLine(currentsMap, l);
                }
            }

            int numPoints = CountNumberOfIntersectingPoints(currentsMap);
            PrintPart(1, $"{numPoints}");

            foreach (Line l in lines)
            {
                if (!l.IsHorizontal() && !l.IsVertical())
                {
                    IncreaseValuesForLine(currentsMap, l);
                }
            }
            numPoints = CountNumberOfIntersectingPoints(currentsMap);
            PrintPart(2, $"{numPoints}");
        }

        private void IncreaseValuesForLine(int[][] currentsMap, Line l)
        {
            int range = Math.Abs(l.Start.X == l.End.X ? l.Start.Y - l.End.Y : l.Start.X - l.End.X) + 1;

            for (int i = 0; i < range; i++)
            {
                int col = l.Start.X < l.End.X ? l.Start.X + i : (l.Start.X > l.End.X ? l.Start.X - i : l.Start.X);
                int row = l.Start.Y < l.End.Y ? l.Start.Y + i : (l.Start.Y > l.End.Y ? l.Start.Y - i : l.Start.Y);

                currentsMap[row][col]++;
            }
        }

        private static int CountNumberOfIntersectingPoints(int[][] currentsMap)
        {
            int numPoints = 0;
            for (int i = 0; i < currentsMap.Length; i++)
            {
                for (int j = 0; j < currentsMap[i].Length; j++)
                {
                    if (currentsMap[i][j] > 1)
                    {
                        numPoints++;
                    }
                }
            }

            return numPoints;
        }

        private int[][] CreateFreeCurrentsMap(IList<Line> lines)
        {
            int maxX = 0;
            int maxY = 0;

            foreach (Line l in lines)
            {
                if (maxX < Math.Max(l.Start.X, l.End.X))
                {
                    maxX = Math.Max(l.Start.X, l.End.X);
                }

                if (maxY < Math.Max(l.Start.Y, l.End.Y))
                {
                    maxY = Math.Max(l.Start.Y, l.End.Y);
                }
            }

            int[][] currentsMap = new int[maxY + 1][];
            for (int i = 0; i < maxY + 1; i++)
            {
                currentsMap[i] = new int[maxX + 1];

                for (int j = 0; j < maxX + 1; j++)
                {
                    currentsMap[i][j] = 0;
                }
            }

            return currentsMap;
        }
    }
}
