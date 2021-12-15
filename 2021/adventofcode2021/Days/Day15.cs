using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day15
    {
        private int[][] _chitonMap;

        public Day15()
        {
            string[] lines = System.IO.File.ReadAllLines(@".\Inputs\day15.txt");

            _chitonMap = new int[lines.Length][];

            for (int i = 0; i < lines.Length; i++)
            {
                _chitonMap[i] = lines[i].ToCharArray().Select(x => x - '0').ToArray();
            }
        }

        public int GetRiskForSafestPathInTile()
        {
            return GetRisklessPath(_chitonMap);
        }

        public int GetRiskForSafestPathInFullMap()
        {
            int[][] map = new int[_chitonMap.Length*5][];

            for (int i = 0; i < _chitonMap.Length * 5; i++)
            {
                map[i] = new int[_chitonMap[0].Length * 5];
            }

            for (int i = 0; i < 5; i++)
            {
                for (int j = 0; j < 5; j++)
                {
                    for (int k = 0; k < _chitonMap.Length; k++)
                    {
                        for (int l = 0; l < _chitonMap[0].Length; l++)
                        {
                            map[i * _chitonMap.Length + k][j * _chitonMap[0].Length + l] = _chitonMap[k][l] + i + j < 10 ? _chitonMap[k][l] + i + j : (_chitonMap[k][l] + i + j) % 10 + 1;
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
