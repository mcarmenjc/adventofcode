using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day15 : Day
    {
        public override void Run()
        {
            PrintDayHeader(15);
            int[][] chitonMap = ParseFile();

            int riskLessPath = GetRisklessPath(chitonMap);
            PrintPart(1, $"{riskLessPath}");

            int riskLessPathForFullMap = GetRiskForSafestPathInFullMap(chitonMap);
            PrintPart(2, $"{riskLessPathForFullMap}");
        }

        private static int[][] ParseFile()
        {
            string[] lines = System.IO.File.ReadAllLines(@".\Inputs\day15.txt");

            int[][] chitonMap = new int[lines.Length][];

            for (int i = 0; i < lines.Length; i++)
            {
                chitonMap[i] = lines[i].ToCharArray().Select(x => x - '0').ToArray();
            }

            return chitonMap;
        }

        private int GetRiskForSafestPathInFullMap(int[][] chitonMap)
        {
            int[][] map = new int[chitonMap.Length*5][];

            for (int i = 0; i < chitonMap.Length * 5; i++)
            {
                map[i] = new int[chitonMap[0].Length * 5];
            }

            for (int i = 0; i < 5; i++)
            {
                for (int j = 0; j < 5; j++)
                {
                    for (int k = 0; k < chitonMap.Length; k++)
                    {
                        for (int l = 0; l < chitonMap[0].Length; l++)
                        {
                            map[i * chitonMap.Length + k][j * chitonMap[0].Length + l] = chitonMap[k][l] + i + j < 10 ? chitonMap[k][l] + i + j : (chitonMap[k][l] + i + j) % 10 + 1;
                        }
                    }
                }
            }

            return GetRisklessPath(map);
        }

        private int GetRisklessPath(int[][] map)
        {
            int[][] risks = new int[map.Length][];

            for (int i = 0; i < map.Length; i++)
            {
                risks[i] = new int[map[0].Length];

                for (int j = 0; j < map[0].Length; j++)
                {
                    risks[i][j] = Int32.MaxValue;
                }
            }

            risks[0][0] = 0;

            int[][] moves = new int[][]
            {
                new int[]{0, 1},
                new int[]{1, 0},
                new int[]{0, -1},
                new int[]{-1, 0},
            };

            Queue<Tuple<int, int>> toVisit = new Queue<Tuple<int, int>>();
            toVisit.Enqueue(new Tuple<int, int>(0, 0));

            while (toVisit.Count > 0)
            {
                Tuple<int, int> position = toVisit.Dequeue();

                foreach (int[] move in moves)
                {
                    int row = position.Item1 + move[0];
                    int col = position.Item2 + move[1];

                    if (row >= 0 && row < map.Length && col >= 0 && col < map[0].Length)
                    {
                        if (risks[row][col] > risks[position.Item1][position.Item2] + map[row][col])
                        {
                            risks[row][col] = risks[position.Item1][position.Item2] + map[row][col];
                            toVisit.Enqueue(new Tuple<int, int>(row, col));
                        }
                    }
                }
            }

            return risks[risks.Length - 1][risks[0].Length - 1];
        }
    }
}
