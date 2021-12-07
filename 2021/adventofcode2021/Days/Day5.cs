using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day5
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

        private IList<Line> _lines;

        public Day5()
        {
            string[] lines = System.IO.File.ReadAllLines(@".\Inputs\day5.txt");
            _lines = new List<Line>();

            foreach(string line in lines)
            {
                _lines.Add(Line.Parse(line));
            }
        }

        public int GetNumberOfPointsWhereTwoOrMoreLinesIntersectForHorizontalAndVerticalLines()
        {
            int[][] currentsMap = CreateFreeCurrentsMap();

            foreach (Line l in _lines)
            {
                if (l.IsHorizontal() || l.IsVertical())
                {
                    IncreaseValuesForLine(currentsMap, l);
                }
            }

            int numPoints = CountNumberOfIntersectingPoints(currentsMap);

            return numPoints;
        }

        public int GetNumberOfPointsWhereTwoOrMoreLinesIntersect()
        {
            int[][] currentsMap = CreateFreeCurrentsMap();

            foreach (Line l in _lines)
            {
                IncreaseValuesForLine(currentsMap, l);
            }

            int numPoints = CountNumberOfIntersectingPoints(currentsMap);

            return numPoints;
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

        private int[][] CreateFreeCurrentsMap()
        {
            int maxX = 0;
            int maxY = 0;

            foreach (Line l in _lines)
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

        public static void Print()
        {
            //"|\" "."" "." "''             " " 5 " "**"
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.Write("     '     . .         .~     ");
            Console.ForegroundColor = ConsoleColor.Magenta;
            Console.Write(".");
            Console.ForegroundColor = ConsoleColor.Red;
            Console.Write(".");
            Console.ForegroundColor = ConsoleColor.White;
            Console.Write("|\\");
            Console.ForegroundColor = ConsoleColor.Red;
            Console.Write(".");
            Console.ForegroundColor = ConsoleColor.Magenta;
            Console.Write(".");
            Console.ForegroundColor = ConsoleColor.DarkYellow;
            Console.Write("''             ");
            Console.ForegroundColor = ConsoleColor.White;
            Console.Write(" 5 ");
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("**");
        }
    }
}
