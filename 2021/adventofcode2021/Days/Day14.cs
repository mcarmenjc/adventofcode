using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace adventofcode2021.Days
{
    public class Day14
    {
        private IDictionary<string, string> _insertionRules;
        private string _polymerTemplate;

        public Day14()
        {
            string manual = System.IO.File.ReadAllText(@".\Inputs\day14.txt");
            string[] parts = manual.Split("\r\n\r\n");
            _polymerTemplate = parts[0];
            ParseInsertionRules(parts[1]);
        }

        private void ParseInsertionRules(string part)
        {
            string[] rules = part.Split("\r\n");
            _insertionRules = new Dictionary<string, string>();

            foreach(string rule in rules)
            {
                string[] ruleParts = rule.Split(" -> ");
                _insertionRules.Add(ruleParts[0], ruleParts[1]);
            }
        }

        public long CalculateMostCommonElementMinusLeastCommonElementAfterXSteps(int steps)
        {
            IDictionary<char, long> elementsCounts = GetElementsCounts(steps);

            long mostCommon = 0;
            long leastCommon = long.MaxValue;

            foreach (char key in elementsCounts.Keys)
            {
                if (mostCommon < elementsCounts[key])
                {
                    mostCommon = elementsCounts[key];
                }

                if (leastCommon > elementsCounts[key])
                {
                    leastCommon = elementsCounts[key];
                }
            }

            return mostCommon - leastCommon;
        }

        private IDictionary<char, long> GetElementsCounts(int steps)
        {
            IDictionary<char, long> counts = new Dictionary<char, long>();

            foreach (char c in _polymerTemplate)
            {
                if (!counts.ContainsKey(c))
                {
                    counts.Add(c, 0);
                }
                counts[c]++;
            }

            IDictionary<string, long> elementPairs = new Dictionary<string, long>();

            for (int i = 0; i < _polymerTemplate.Length-1; i++)
            {
                string pair = $"{_polymerTemplate[i]}{_polymerTemplate[i + 1]}";
                
                if (!elementPairs.ContainsKey(pair))
                {
                    elementPairs.Add(pair, 0);
                }

                elementPairs[pair]++;
            }

            for (int i = 0; i < steps; i++)
            {
                IDictionary<string, long> nextPairs = new Dictionary<string, long>();

                foreach (string key in elementPairs.Keys)
                {
                    char newElement = _insertionRules[key][0];

                    if (!counts.ContainsKey(newElement))
                    {
                        counts.Add(newElement, 0);
                    }

                    counts[newElement] += elementPairs[key];

                    string[] pairs = { $"{key[0]}{newElement}", $"{newElement}{key[1]}" };

                    foreach(string pair in pairs)
                    {
                        if (!nextPairs.ContainsKey(pair))
                        {
                            nextPairs.Add(pair, 0);
                        }

                        nextPairs[pair] += elementPairs[key];
                    }
                }

                elementPairs = nextPairs;
            }

            return counts;
        }

        private string GeneratePolymerAfterXSteps(int steps)
        {
            string polymer = _polymerTemplate;

            for (int i = 0; i < steps; i++)
            {
                polymer = GenerateNextPolymer(polymer);
            }

            return polymer;
        }

        private string GenerateNextPolymer(string polymer)
        {
            StringBuilder polymerBuilder = new StringBuilder();
            polymerBuilder.Append(polymer[0]);

            for (int j = 0; j < polymer.Length - 1; j++)
            {
                string elementToInsert = _insertionRules[$"{polymer[j]}{polymer[j + 1]}"];
                polymerBuilder.Append(elementToInsert);
                polymerBuilder.Append(polymer[j + 1]);
            }

            return polymerBuilder.ToString();
        }
    }
}
