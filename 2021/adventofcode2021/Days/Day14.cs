using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace adventofcode2021.Days
{
    public class Day14 : Day
    {
        public override void Run()
        {
            PrintDayHeader(14);

            string manual = System.IO.File.ReadAllText(@".\Inputs\day14.txt");
            string[] parts = manual.Split("\r\n\r\n");
            string polymerTemplate = parts[0];
            IDictionary<string, string> insertionRules = ParseInsertionRules(parts[1]);

            long valueAfter10Steps = CalculateMostCommonElementMinusLeastCommonElementAfterXSteps(10, polymerTemplate, insertionRules);
            PrintPart(1, $"{valueAfter10Steps}");

            long valueAfter40Steps = CalculateMostCommonElementMinusLeastCommonElementAfterXSteps(40, polymerTemplate, insertionRules);
            PrintPart(2, $"{valueAfter40Steps}");
        }

        private IDictionary<string, string> ParseInsertionRules(string part)
        {
            string[] rules = part.Split("\r\n");
            IDictionary<string, string> insertionRules = new Dictionary<string, string>();

            foreach(string rule in rules)
            {
                string[] ruleParts = rule.Split(" -> ");
                insertionRules.Add(ruleParts[0], ruleParts[1]);
            }

            return insertionRules;
        }

        private long CalculateMostCommonElementMinusLeastCommonElementAfterXSteps(int steps, string polymerTemplate, IDictionary<string, string> insertionRules)
        {
            IDictionary<char, long> elementsCounts = GetElementsCounts(steps, polymerTemplate, insertionRules);

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

        private IDictionary<char, long> GetElementsCounts(int steps, string polymerTemplate, IDictionary<string, string> insertionRules)
        {
            IDictionary<char, long> counts = new Dictionary<char, long>();

            foreach (char c in polymerTemplate)
            {
                if (!counts.ContainsKey(c))
                {
                    counts.Add(c, 0);
                }
                counts[c]++;
            }

            IDictionary<string, long> elementPairs = new Dictionary<string, long>();

            for (int i = 0; i < polymerTemplate.Length-1; i++)
            {
                string pair = $"{polymerTemplate[i]}{polymerTemplate[i + 1]}";
                
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
                    char newElement = insertionRules[key][0];

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

        private string GeneratePolymerAfterXSteps(int steps, string polymerTemplate, IDictionary<string, string> insertionRules)
        {
            string polymer = polymerTemplate;

            for (int i = 0; i < steps; i++)
            {
                polymer = GenerateNextPolymer(polymer, insertionRules);
            }

            return polymer;
        }

        private string GenerateNextPolymer(string polymer, IDictionary<string, string> insertionRules)
        {
            StringBuilder polymerBuilder = new StringBuilder();
            polymerBuilder.Append(polymer[0]);

            for (int j = 0; j < polymer.Length - 1; j++)
            {
                string elementToInsert = insertionRules[$"{polymer[j]}{polymer[j + 1]}"];
                polymerBuilder.Append(elementToInsert);
                polymerBuilder.Append(polymer[j + 1]);
            }

            return polymerBuilder.ToString();
        }
    }
}
