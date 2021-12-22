using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace adventofcode2021.Days
{
    public class Day13 : Day
    {
        public override void Run()
        {
            PrintDayHeader(13);
            string instructions = System.IO.File.ReadAllText(@".\Inputs\day13.txt");
            string[] parts = instructions.Split("\r\n\r\n");
            IList<Tuple<int, int>> points = ParsePoints(parts[0]);
            IList<Tuple<int, int>> folds = ParseFolds(parts[1]);


            IList<Tuple<int, int>> pointsAfterFirstFold = FoldPage(folds[0], points);
            PrintPart(1, $"{pointsAfterFirstFold.Count}");            

            PrintPart(2, string.Empty);
            PrintCodeAfterFolding(points, folds);
        }

        private void PrintCodeAfterFolding(IList<Tuple<int, int>> points, IList<Tuple<int, int>> folds)
        {
            foreach (var fold in folds)
            {
                points = FoldPage(fold, points);
            }

            PrintCode(points);
        }

        private void PrintCode(IList<Tuple<int, int>> points)
        {
            int maxX = 0;
            int maxY = 0;

            foreach (var point in points)
            {
                if (point.Item1 > maxX) 
                {
                    maxX = point.Item1;
                }

                if (point.Item2 > maxY)
                {
                    maxY = point.Item2;
                }
            }

            string[][] display = new string[maxY + 1][];
            
            for(int i = 0; i < maxY+1; i++)
            {
                display[i] = new string[maxX + 1];

                for (int j = 0; j < maxX+1; j++)
                {
                    display[i][j] = ".";
                }
            }

            foreach (var point in points)
            {
                display[point.Item2][point.Item1] = "#";
            }

            for (int i = 0; i < maxY + 1; i++)
            {
                Console.WriteLine(string.Join("", display[i]));
            }
        }

        private IList<Tuple<int, int>> FoldPage(Tuple<int, int> fold, IList<Tuple<int, int>> points)
        {
            HashSet<Tuple<int, int>> foldedPoints = new HashSet<Tuple<int, int>>();

            foreach (var point in points)
            {
                if (fold.Item1 == 0)
                {
                    if (point.Item2 < fold.Item2)
                    {
                        foldedPoints.Add(point);
                    }
                    else
                    {
                        foldedPoints.Add(new Tuple<int, int>(point.Item1, 2*fold.Item2 - point.Item2 ));
                    }
                }
                else
                {
                    if (point.Item1 < fold.Item1)
                    {
                        foldedPoints.Add(point);
                    }
                    else
                    {
                        foldedPoints.Add(new Tuple<int, int>(2 * fold.Item1 - point.Item1, point.Item2));
                    }
                }
            }

            return foldedPoints.ToList();
        }

        private IList<Tuple<int, int>> ParsePoints(string pointsStr)
        {
            IList<Tuple<int, int>> points = new List<Tuple<int, int>>();
            string[] lines = pointsStr.Split("\n");
            foreach (string line in lines)
            {
                string[] parts = line.Split(",");
                points.Add(new Tuple<int, int>(Int32.Parse(parts[0]), Int32.Parse(parts[1])));
            }

            return points;
        }

        private IList<Tuple<int, int>> ParseFolds(string foldsStr)
        {
            IList<Tuple<int, int>>  folds = new List<Tuple<int, int>>();
            string[] lines = foldsStr.Split("\n");
            foreach (string line in lines)
            {
                Match m = Regex.Match(line, @"([xy])=(\d+)");

                if (m.Groups[1].Value == "x")
                {
                    folds.Add(new Tuple<int, int>(Int32.Parse(m.Groups[2].Value), 0));
                }
                else
                {
                    folds.Add(new Tuple<int, int>(0, Int32.Parse(m.Groups[2].Value)));
                }
            }

            return folds;
        }
    }
}
