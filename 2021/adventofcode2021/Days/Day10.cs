﻿using System;
using System.Collections.Generic;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day10
    {
        private string[] _navigationSubsystem;

        public Day10()
        {
            _navigationSubsystem = System.IO.File.ReadAllLines(@".\Inputs\day10.txt");
        }

        public int GetSyntaxErrorScore()
        {
            IDictionary<char, int> illegalChars = GetIllegalCharacters();
            IDictionary<char, int> points = new Dictionary<char, int>()
            {
                { ')', 3 },
                { ']', 57 },
                { '}', 1197 },
                { '>', 25137 }
            };

            int score = 0;

            foreach(char key in illegalChars.Keys)
            {
                score += illegalChars[key] * points[key];
            }

            return score;
        }

        public long GetAutocompleteMiddleScore()
        {
            List<long> autocompleteScores = GetAutocompleteScores();
            autocompleteScores.Sort();
            int middleScore = autocompleteScores.Count / 2;
            return autocompleteScores[middleScore];
        }

        private List<long> GetAutocompleteScores()
        {
            List<long> scores = new List<long>();
            IDictionary<char, char> validSegments = new Dictionary<char, char>()
            {
                { ')', '(' },
                { ']', '[' },
                { '}', '{' },
                { '>', '<' }
            };

            IDictionary<char, int> points = new Dictionary<char, int>()
            {
                { '(', 1 },
                { '[', 2 },
                { '{', 3 },
                { '<', 4 }
            };

            foreach (string line in _navigationSubsystem)
            {
                Stack<char> openings = new Stack<char>();
                bool corruptedLine = false;
                int i = 0;

                while (!corruptedLine && i < line.Length)
                {
                    if (line[i] == '(' || line[i] == '[' || line[i] == '{' || line[i] == '<')
                    {
                        openings.Push(line[i]);
                    }

                    if (line[i] == ')' || line[i] == ']' || line[i] == '}' || line[i] == '>')
                    {
                        char opening = openings.Pop();

                        if (validSegments[line[i]] != opening)
                        {
                            corruptedLine = true;
                        }
                    }

                    i++;
                }

                if (!corruptedLine && openings.Count > 0)
                {
                    long score = 0;
                    while(openings.Count > 0)
                    {
                        char opening = openings.Pop();
                        score *= 5;
                        score += points[opening];
                    }

                    scores.Add(score);
                }
            }

            return scores;
        }

        private IDictionary<char, int> GetIllegalCharacters()
        {
            IDictionary<char, int> illegalCharacters = new Dictionary<char, int>();
            IDictionary<char, char> validSegments = new Dictionary<char, char>()
            {
                { ')', '(' },
                { ']', '[' },
                { '}', '{' },
                { '>', '<' }
            };

            foreach(string line in _navigationSubsystem)
            {
                Stack<char> openings = new Stack<char>();
                bool corruptedLine = false;
                int i = 0;
                
                while (!corruptedLine && i < line.Length)
                {
                    if (line[i] == '(' || line[i] == '[' || line[i] == '{' || line[i] == '<')
                    {
                        openings.Push(line[i]);
                    }

                    if (line[i] == ')' || line[i] == ']' || line[i] == '}' || line[i] == '>')
                    {
                        char opening = openings.Pop();

                        if (validSegments[line[i]] != opening)
                        {
                            corruptedLine = true;

                            if (!illegalCharacters.ContainsKey(line[i]))
                            {
                                illegalCharacters.Add(line[i], 0);
                            }

                            illegalCharacters[line[i]]++;
                        }
                    }

                    i++;
                }
            }

            return illegalCharacters;
        }
    }
}
