using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day3 : Day
    {
        public override void Run()
        {
            PrintDayHeader(3);
            string[] diagnosticReport = System.IO.File.ReadAllLines(@".\Inputs\day3.txt");

            int powerConsumption = GetPowerConsuption(diagnosticReport);
            PrintPart(1, $"{powerConsumption}");

            int lifeSupportRating = GetLifeSupportRating(diagnosticReport);
            PrintPart(2, $"{lifeSupportRating}");
        }

        private int GetPowerConsuption(string[] diagnosticReport)
        {
            IList<IDictionary<char, int>> bitsCounts = GetBitsCounts(diagnosticReport);
            int gammaRate = Convert.ToInt32(GetGammaRate(bitsCounts), 2);
            int epsilonRate = Convert.ToInt32(GetEpsilonRate(bitsCounts), 2);

            return gammaRate*epsilonRate;
        }

        private int GetLifeSupportRating(string[] diagnosticReport)
        {
            int oxygenGeneratorRating = Convert.ToInt32(GetOxygenGeneratorRating(diagnosticReport), 2);
            int co2ScrubberRating = Convert.ToInt32(GetCo2ScrubberRating(diagnosticReport), 2);

            return oxygenGeneratorRating * co2ScrubberRating;
        }

        private IList<IDictionary<char, int>> GetBitsCounts(string[] diagnosticReport)
        {
            IList<IDictionary<char, int>> bitsCounts = new List<IDictionary<char, int>>();

            foreach (string diagnostic in diagnosticReport)
            {
                for (int i = 0; i < diagnostic.Length; i++)
                {
                    if (bitsCounts.Count <= i)
                    {
                        bitsCounts.Add(new Dictionary<char, int>());
                        bitsCounts[i].Add('0', 0);
                        bitsCounts[i].Add('1', 0);
                    }

                    bitsCounts[i][diagnostic[i]]++;
                }
            }

            return bitsCounts;
        }

        private string GetGammaRate(IList<IDictionary<char, int>> bitsCounts)
        {
            StringBuilder gammaRate = new StringBuilder();

            foreach(var counts in bitsCounts)
            {
                if (counts['0'] > counts['1'])
                {
                    gammaRate.Append('0');
                }
                else
                {
                    gammaRate.Append('1');
                }
            }

            return gammaRate.ToString();
        }

        private string GetEpsilonRate(IList<IDictionary<char, int>> bitsCounts)
        {
            StringBuilder gammaRate = new StringBuilder();

            foreach (var counts in bitsCounts)
            {
                if (counts['0'] < counts['1'])
                {
                    gammaRate.Append('0');
                }
                else
                {
                    gammaRate.Append('1');
                }
            }

            return gammaRate.ToString();
        }

        private string GetOxygenGeneratorRating(string[] diagnosticReport)
        {
            IList<string> filteredDiagnostics = new List<string>(diagnosticReport);
            int pos = 0;

            while(filteredDiagnostics.Count > 1 && pos < filteredDiagnostics[0].Length)
            {
                IDictionary<char, int> counts = CountBits(filteredDiagnostics, pos);

                if (counts['0'] > counts['1'])
                {
                    filteredDiagnostics = filteredDiagnostics.Where(x => x[pos] == '0').ToList();
                }
                else
                {
                    filteredDiagnostics = filteredDiagnostics.Where(x => x[pos] == '1').ToList();
                }

                pos++;
            }

            return filteredDiagnostics[0];
        }

        private IDictionary<char, int> CountBits(IList<string> diagnostics, int pos)
        {
            IDictionary<char, int> counts = new Dictionary<char, int>();
            counts.Add('0', 0);
            counts.Add('1', 0);

            foreach (string diagnostic in diagnostics)
            {
                counts[diagnostic[pos]]++;
            }

            return counts;
        }

        private string GetCo2ScrubberRating(string[] diagnosticReport)
        {
            IList<string> filteredDiagnostics = new List<string>(diagnosticReport);
            int pos = 0;

            while (filteredDiagnostics.Count > 1 && pos < filteredDiagnostics[0].Length)
            {
                IDictionary<char, int> counts = CountBits(filteredDiagnostics, pos);

                if (counts['0'] <= counts['1'])
                {
                    filteredDiagnostics = filteredDiagnostics.Where(x => x[pos] == '0').ToList();
                }
                else
                {
                    filteredDiagnostics = filteredDiagnostics.Where(x => x[pos] == '1').ToList();
                }

                pos++;
            }

            return filteredDiagnostics[0];
        }
    }
}
