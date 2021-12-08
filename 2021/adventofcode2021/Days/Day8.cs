using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day8
    {
        public class Note
        {
            public HashSet<string> Patterns { get; set; }
            public IList<string> OutputValue { get; set; }

            public int DecodeOutput()
            {
                IDictionary<string, int> decodedPattern = GetDigitsForPatterns();
                int digit = 1000;
                int decodedOutput = 0;

                foreach(string d in OutputValue)
                {
                    decodedOutput += decodedPattern[d] * digit;
                    digit = digit / 10;
                }

                return decodedOutput;
            }

            private IDictionary<string, int> GetDigitsForPatterns()
            {
                IDictionary<string, int> decodedPatterns = new Dictionary<string, int>();

                string one = Patterns.First(x => x.Length == 2);
                string four = Patterns.First(x => x.Length == 4);
                string seven = Patterns.First(x => x.Length == 3);
                string eight = Patterns.First(x => x.Length == 7);
                string three = Patterns.First(x => x.Length == 5 && ContainsNumberPattern(x, seven));
                string nine = Patterns.First(x => x.Length == 6 && ContainsNumberPattern(x, three));
                string zero = Patterns.First(x => x.Length == 6 && ContainsNumberPattern(x, seven) && x != nine);
                string six = Patterns.First(x => x.Length == 6 && x != nine && x != zero);
                string five = Patterns.First(x => x.Length == 5 && x != three && ContainsNumberPattern(six, x));
                string two = Patterns.First(x => x.Length == 5 && x != three && x != five);

                decodedPatterns.Add(one, 1);
                decodedPatterns.Add(two, 2);
                decodedPatterns.Add(three, 3);
                decodedPatterns.Add(four, 4);
                decodedPatterns.Add(five, 5);
                decodedPatterns.Add(six, 6);
                decodedPatterns.Add(seven, 7);
                decodedPatterns.Add(eight, 8);
                decodedPatterns.Add(nine, 9);
                decodedPatterns.Add(zero, 0);

                return decodedPatterns;
            }

            private bool ContainsNumberPattern(string number, string containedNumber)
            {
                HashSet<char> numberChars = number.ToCharArray().ToHashSet();

                foreach(char c in containedNumber)
                {
                    if (!numberChars.Contains(c))
                    {
                        return false;
                    }
                }

                return true;
            }

            public static Note Parse(string entry)
            {
                Note line = new Note()
                {
                    Patterns = new HashSet<string>(),
                    OutputValue = new List<string>()
                };

                string[] parts = entry.Split("|");

                line.Patterns = parts[0].Trim().Split(" ").Select(x =>
                {
                    char[] characters = x.ToCharArray();
                    Array.Sort(characters);
                    return string.Join("", characters);
                }).ToHashSet();

                line.OutputValue = parts[1].Trim().Split(" ").Select(x =>
                {
                    char[] characters = x.ToCharArray();
                    Array.Sort(characters);
                    return string.Join("", characters);
                }).ToList();

                return line;
            }
        }

        private IList<Note> _notes;

        public Day8()
        {
            string[] lines = System.IO.File.ReadAllLines(@".\Inputs\day8.txt");
            _notes = new List<Note>();

            foreach(string line in lines)
            {
                _notes.Add(Note.Parse(line));
            }
        }

        public int CountUniqueDigitsInOutputs()
        {
            int count = 0;

            foreach(Note n in _notes)
            {
                foreach(string digit in n.OutputValue)
                {
                    if (digit.Length == 2 || digit.Length == 4 || digit.Length == 3 || digit.Length == 7)
                    {
                        count++;
                    }
                }
            }

            return count;
        }

        public int GetSumOfAllDecodedOutputs()
        {
            int counter = 0;

            foreach(Note n in _notes)
            {
                int decodedOutput = n.DecodeOutput();
                counter += decodedOutput;
            }

            return counter;
        }

        
    }
}
