using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day11 : Day
    {
        public override void Run()
        {
            PrintDayHeader(11);
            int[][] dumboOctopuses = ParseFile();

            int numFlashes = GetNumberOfFlashesAfterXSteps(100, dumboOctopuses);
            PrintPart(1, $"{numFlashes}");

            int stepAllFlash = GetStepAllOctopusesFlashAtTheSameTime(dumboOctopuses);
            PrintPart(2, $"{stepAllFlash}");
        }

        private static int[][] ParseFile()
        {
            string[] lines = System.IO.File.ReadAllLines(@".\Inputs\day11.txt");
            int[][] dumboOctopuses = new int[lines.Length][];

            for (int i = 0; i < lines.Length; i++)
            {
                dumboOctopuses[i] = lines[i].ToCharArray().Select(x => x - '0').ToArray();
            }

            return dumboOctopuses;
        }

        private int GetNumberOfFlashesAfterXSteps(int numSteps, int[][] dumboOctopuses)
        {
            int numFlashes = 0;
            int[][] initState = CreateInitState(dumboOctopuses);

            for (int i = 0; i < numSteps; i++)
            {
                numFlashes += PerformStep(initState);
            }

            return numFlashes;
        }

        private int GetStepAllOctopusesFlashAtTheSameTime(int[][] dumboOctopuses)
        {
            int step = 0;
            int[][] state = CreateInitState(dumboOctopuses);
            int numFlashes = 0;
            int numOctopus = state.Length * state[0].Length;

            while (numFlashes < numOctopus)
            {
                numFlashes = PerformStep(state);
                step++;
            }

            return step;
        }

        private int PerformStep(int[][] state)
        {
            Queue<Tuple<int, int>> flashingOctopuses = new Queue<Tuple<int, int>>();
            int[][] moves = new int[][]
            {
                new int[] {0, 1},
                new int[] {1, 1},
                new int[] {1, 0},
                new int[] {1, -1},
                new int[] {0, -1},
                new int[] {-1, -1},
                new int[] {-1, 0},
                new int[] {-1, 1},
            };
            int numFlashes = 0;

            for(int i = 0; i < state.Length; i++)
            {
                for (int j = 0; j < state[i].Length; j++)
                {
                    state[i][j]++;

                    if (state[i][j] > 9)
                    {
                        flashingOctopuses.Enqueue(new Tuple<int, int>(i, j));
                    }
                }
            }

            while (flashingOctopuses.Count > 0)
            {
                Tuple<int, int> octopus = flashingOctopuses.Dequeue();
                state[octopus.Item1][octopus.Item2] = 0;
                numFlashes++;

                foreach(int[] move in moves)
                {
                    int i = octopus.Item1 + move[0];
                    int j = octopus.Item2 + move[1];

                    if (i >= 0 && i < state.Length && j >= 0 && j < state[i].Length && state[i][j] != 0)
                    {
                        state[i][j]++;
                        
                        if (state[i][j] == 10)
                        {
                            flashingOctopuses.Enqueue(new Tuple<int, int>(i, j));
                        }
                    }
                }
            }

            return numFlashes;
        }

        private int[][] CreateInitState(int[][] dumboOctopuses)
        {
            int[][] initState = new int[dumboOctopuses.Length][];

            for(int i = 0; i < dumboOctopuses.Length; i++)
            {
                initState[i] = new int[dumboOctopuses[i].Length];
                Array.Copy(dumboOctopuses[i], initState[i], dumboOctopuses[i].Length);
            }

            return initState;
        }
    }
}
