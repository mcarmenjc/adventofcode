using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day9 : Day
    {
        public override void Run()
        {
            PrintDayHeader(9);
            int[][] heightmap = ParseFile();

            int riskLevels = GetSumOfRiskLevels(heightmap);
            PrintPart(1, $"{riskLevels}");

            int levelOfLargests = GetValueOf3LargestBasins(heightmap);
            PrintPart(2, $"{levelOfLargests}");
        }

        private static int[][] ParseFile()
        {
            string[] rows = System.IO.File.ReadAllLines(@".\Inputs\day9.txt");
            int[][] heightmap = new int[rows.Length][];

            for (int i = 0; i < rows.Length; i++)
            {
                heightmap[i] = rows[i].ToCharArray().Select(x => x - '0').ToArray();
            }

            return heightmap;
        }

        private int GetSumOfRiskLevels(int[][] heightmap)
        {
            int sum = 0;
            IList<Tuple<int, int>> riskPoints = FindRiskPoints(heightmap);

            foreach(var point in riskPoints)
            {
                sum += heightmap[point.Item1][point.Item2] + 1;
            }

            return sum;
        }

        private int GetValueOf3LargestBasins(int[][] heightmap)
        {
            IList<Tuple<int, int>> riskPoints = FindRiskPoints(heightmap);
            List<int> basinSizes = new List<int>();

            foreach(var point in riskPoints)
            {
                int basinSize = GetBasinSize(point, new HashSet<Tuple<int, int>>(), heightmap);
                basinSizes.Add(basinSize);
            }

            basinSizes.Sort((x, y) => y-x);

            return basinSizes[0]*basinSizes[1]*basinSizes[2];
        }

        private int GetBasinSize(Tuple<int, int> point, HashSet<Tuple<int, int>> visited, int[][] heightmap)
        {
            int[][] moves = new int[][]{
                new int[] { 0, 1 },
                new int[] { 1, 0 },
                new int[] { -1, 0 },
                new int[] { 0, -1 }
            };

            visited.Add(point);
            int basinSize = 1;

            foreach (int[] move in moves)
            {
                Tuple<int, int> newPoint = new Tuple<int, int>(point.Item1 + move[0], point.Item2 + move[1]);
                if (newPoint.Item1 >= 0 && newPoint.Item1 < heightmap.Length && 
                    newPoint.Item2 >= 0 && newPoint.Item2 < heightmap[point.Item1].Length &&
                    !visited.Contains(newPoint) &&
                    heightmap[newPoint.Item1][newPoint.Item2] < 9)
                {
                    basinSize += GetBasinSize(newPoint, visited, heightmap);
                }
            }

            return basinSize;
        }

        private IList<Tuple<int, int>> FindRiskPoints(int[][] heightmap)
        {
            int[][] moves = new int[][]{
                new int[] { 0, 1 },
                new int[] { 1, 0 },
                new int[] { -1, 0 },
                new int[] { 0, -1 }
            };

            IList<Tuple<int, int>> riskPoints = new List<Tuple<int, int>>();

            for (int i = 0; i < heightmap.Length; i++)
            {
                for (int j = 0; j < heightmap[i].Length; j++)
                {
                    bool isRisk = true;

                    foreach (int[] move in moves)
                    {
                        if (i + move[0] >= 0 && i + move[0] < heightmap.Length && j + move[1] >= 0 && j + move[1] < heightmap[i].Length)
                        {
                            isRisk = isRisk && heightmap[i][j] < heightmap[i + move[0]][j + move[1]];
                        }
                    }

                    if (isRisk)
                    {
                        riskPoints.Add(new Tuple<int, int>(i, j));
                    }
                }
            }

            return riskPoints;
        }
    }
}
