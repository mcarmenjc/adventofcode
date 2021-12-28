using System;
using System.Collections.Generic;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day25 : Day
    {
        public override void Run()
        {
            PrintDayHeader(25);

            string[] lines = System.IO.File.ReadAllLines(@".\Inputs\day25.txt");
            char[][] cucumbers = new char[lines.Length][];

            for (int i = 0; i < lines.Length; i++)
            {
                cucumbers[i] = lines[i].ToCharArray();
            }

            int step = FindStepWhenCucumbersStop(cucumbers);
            PrintPart(1, $"{step}");
        }

        private int FindStepWhenCucumbersStop(char[][] cucumbers)
        {
            char[][] current = new char[cucumbers.Length][];

            for (int i = 0; i < cucumbers.Length; i++)
            {
                current[i] = new char[cucumbers[i].Length];
                Array.Copy(cucumbers[i], current[i], cucumbers[i].Length);
            }

            int step = 0;
            bool stop = false;

            while (!stop)
            {
                char[][] next = MoveCucumbers(current);
                
                bool areEqual = true;
                for (int i = 0; i < current.Length; i++)
                {
                    string currentRow = string.Join("", current[i]);
                    string nextRow = string.Join("", next[i]);

                    if (!currentRow.Equals(nextRow))
                    {
                        areEqual = false;
                    }
                }

                stop = areEqual;
                step++;
                current = next;
            }

            return step;
        }

        private char[][] MoveCucumbers(char[][] current)
        {
            char[][] next = new char[current.Length][];
            
            for(int i = 0; i < current.Length; i++)
            {
                next[i] = new char[current[i].Length];
                Array.Fill(next[i], '.');
            }

            MoveLeft(current, next);
            MoveDown(current, next);

            return next;
        }

        private void MoveLeft(char[][] current, char[][] next)
        {
            for (int i = 0; i < current.Length; i++)
            {
                for (int j = 0; j < current[i].Length; j++)
                {
                    if (current[i][j] == '>')
                    {
                        int nextLeft = (j + 1) % current[i].Length;

                        if (current[i][nextLeft] == '.')
                        {
                            next[i][j] = '.';
                            next[i][nextLeft] = '>';
                        }
                        else
                        {
                            next[i][j] = '>';
                        }
                    }
                    else
                    {
                        if (current[i][j] == 'v')
                        {
                            next[i][j] = 'v';
                        }
                    }
                }
            }
        }

        private void MoveDown(char[][] current, char[][] next)
        {
            for (int i = 0; i < current.Length; i++)
            {
                for (int j = 0; j < current[i].Length; j++)
                {
                    if (current[i][j] == 'v')
                    {
                        int nextDown = (i + 1) % current.Length;

                        if (next[nextDown][j] == '.' && current[nextDown][j] != 'v')
                        {
                            next[i][j] = '.';
                            next[nextDown][j] = 'v';
                        }
                    }
                }
            }
        }
    }
}
