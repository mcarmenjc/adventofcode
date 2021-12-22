using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day19 : Day
    {
        public override void Run()
        {
            IList<IList<int[]>> scannersBearersData = ParseFile();
            PrintDayHeader(19);

            HashSet<Tuple<int, int, int>> bearers = new HashSet<Tuple<int, int, int>>(scannersBearersData[0].Select(x => new Tuple<int, int, int>(x[0], x[1], x[2])));
            IDictionary<int, int[]> scannersPositions = new Dictionary<int, int[]>() { 
                { 0, new int[] { 0, 0, 0 }}
            };

            IList<IDictionary<int, HashSet<Tuple<int, int, int>>>> scannersBearersDistances = new List<IDictionary<int, HashSet<Tuple<int, int, int>>>>();

            foreach(var scannersData in scannersBearersData)
            {
                scannersBearersDistances.Add(CalculateBearersDistances(scannersData));
            }

            while (scannersPositions.Keys.Count < scannersBearersData.Count)
            {
                IList<int[]> currentBearers = bearers.Select(x => new int[] { x.Item1, x.Item2, x.Item3 }).ToList();
                var bearerDistances = CalculateBearersDistances(currentBearers);

                for (int i = 1; i < scannersBearersData.Count; i++)
                {
                    if (!scannersPositions.ContainsKey(i))
                    {
                        var matches = MatchBearersInDifferentScanners(bearerDistances, scannersBearersDistances[i]);

                        if (matches.Keys.Count >= 12)
                        {
                            var rotationTransformation = CalculateRotationTransformation(matches, currentBearers, scannersBearersData[i]);
                            ApplyTransformation(bearers, scannersBearersData[i], rotationTransformation);
                            scannersPositions.Add(i, rotationTransformation[2]);
                        }
                    }
                }
            }

            PrintPart(1, $"{bearers.Count}");
            
            int largestManhattanDistance = GetLargestManhattanDistance(scannersPositions);
            PrintPart(2, $"{largestManhattanDistance}");
        }

        private int GetLargestManhattanDistance (IDictionary<int, int[]> scannersPositions)
        {
            int maxDistance = 0;

            for (int i = 0; i < scannersPositions.Keys.Count; i++)
            {
                for (int j = i + 1; j <scannersPositions.Keys.Count; j++)
                {
                    int distance = CalculateManhattanDistance(scannersPositions[i], scannersPositions[j]);

                    if (distance > maxDistance)
                    {
                        maxDistance = distance;
                    }
                }
            }

            return maxDistance;
        }

        private int CalculateManhattanDistance(int[] scanner1, int[] scanner2)
        {
            return Math.Abs(scanner1[0] - scanner2[0]) + Math.Abs(scanner1[1] - scanner2[1]) + Math.Abs(scanner1[2] - scanner2[2]);
        }

        private void ApplyTransformation(HashSet<Tuple<int, int, int>> bearers, IList<int[]> scannerData, int[][] transformation)
        {
            foreach (int[] bearer in scannerData)
            {
                int x = bearer[transformation[0][0]] * transformation[1][0] + transformation[2][0];
                int y = bearer[transformation[0][1]] * transformation[1][1] + transformation[2][1];
                int z = bearer[transformation[0][2]] * transformation[1][2] + transformation[2][2];

                bearers.Add(new Tuple<int, int, int>(x, y, z));
            }
        }

        private int[][] CalculateRotationTransformation(IDictionary<int, int> matches, IList<int[]> scanner1, IList<int[]> scanner2)
        {
            int[][] rotations1 = new int[][]
            {
                new int[] { 0, 1, 2 },
                new int[] { 0, 2, 1 },
                new int[] { 2, 1, 0 },
                new int[] { 1, 2, 0 },
                new int[] { 1, 0, 2 },
                new int[] { 2, 0, 1 }
            };

            int[][] rotations2 = new int[][]
            {
                new int[] { 1, 1, 1 },
                new int[] { -1, 1, 1 },
                new int[] { 1, -1, 1 },
                new int[] { 1, 1, -1 },
                new int[] { -1, -1, 1 },
                new int[] { -1, 1, -1 },
                new int[] { 1, -1, -1 },
                new int[] { -1, -1, -1 }
            };

            foreach (int[] rot1 in rotations1)
            {
                foreach (int[] rot2 in rotations2)
                {
                    int[] transformation = null;
                    int count = 0;

                    foreach (var match in matches)
                    {
                        int x = scanner1[match.Key][0] - scanner2[match.Value][rot1[0]] * rot2[0];
                        int y = scanner1[match.Key][1] - scanner2[match.Value][rot1[1]] * rot2[1];
                        int z = scanner1[match.Key][2] - scanner2[match.Value][rot1[2]] * rot2[2];

                        if (transformation == null)
                        {
                            transformation = new int[]
                            {
                            x, y, z
                            };
                        }

                        if (transformation[0] == x && transformation[1] == y && transformation[2] == z)
                        {
                            count++;
                        }
                    }

                    if (count >= 12)
                    {
                        return new int[][]
                        {
                        rot1,
                        rot2,
                        transformation
                        };
                    }
                }
            }

            return null;
        }
        
        private IDictionary<int, int> MatchBearersInDifferentScanners(IDictionary<int, HashSet<Tuple<int, int, int>>> bearersDistancesScanner1, IDictionary<int, HashSet<Tuple<int, int, int>>> bearersDistancesScanner2)
        {
            int[][] distanceCombinations = new int[][]
            {
                new int[]{ 0, 1, 2 },
                new int[]{ 0, 2, 1 },
                new int[]{ 2, 1, 0 },
                new int[]{ 1, 2, 0 },
                new int[]{ 1, 0, 2 },
                new int[]{ 2, 0, 1 }
            };

            foreach (int[] combination in distanceCombinations)
            {
                IDictionary<int, int> matches = new Dictionary<int, int>();

                foreach (int bearer1 in bearersDistancesScanner1.Keys)
                {
                    foreach (int bearer2 in bearersDistancesScanner2.Keys)
                    {
                        HashSet<Tuple<int, int, int>> distances = bearersDistancesScanner2[bearer2].Select(x => new int[] { x.Item1, x.Item2, x.Item3 }).
                            Select(x => new Tuple<int, int, int>(x[combination[0]], x[combination[1]], x[combination[2]])).ToHashSet();
                        int common = bearersDistancesScanner1[bearer1].Intersect(distances).Count();

                        if (common >= 11)
                        {
                            matches.Add(bearer1, bearer2);
                        }
                    }
                }

                if (matches.Keys.Count >= 12)
                {
                    return matches;
                }
            }

            return new Dictionary<int, int>();
        }

        private IDictionary<int, HashSet<Tuple<int, int, int>>> CalculateBearersDistances(IList<int[]> scannerData)
        {
            IDictionary<int, HashSet<Tuple<int, int, int>>> bearersDistances = new Dictionary<int, HashSet<Tuple<int, int, int>>>();

            for (int i = 0; i < scannerData.Count; i++)
            {
                bearersDistances.Add(i, new HashSet<Tuple<int, int, int>>());
                
                for (int j = 0; j < scannerData.Count; j++)
                {
                    if (i != j) 
                    {
                        bearersDistances[i].Add(GetDistance(scannerData[i], scannerData[j]));
                    }
                }
            }

            return bearersDistances;
        }

        private Tuple<int, int, int> GetDistance(int[] point1, int[] point2)
        {
            int x = point1[0] - point2[0];
            int y = point1[1] - point2[1];
            int z = point1[2] - point2[2];
            return new Tuple<int, int, int>(Math.Abs(x), Math.Abs(y), Math.Abs(z));
        }

        private List<IList<int[]>> ParseFile()
        {
            string[] lines = System.IO.File.ReadAllLines(@".\Inputs\day19.txt");
            List<IList<int[]>> scanners = new List<IList<int[]>>();

            foreach (string line in lines)
            {
                if (line.Contains("--- scanner"))
                {
                    scanners.Add(new List<int[]>());
                }
                else
                {
                    if (!string.IsNullOrWhiteSpace(line))
                    {
                        string[] coords = line.Split(",");
                        scanners.Last().Add(new int[] { Int32.Parse(coords[0]), Int32.Parse(coords[1]), Int32.Parse(coords[2]) });
                    }
                }
            }

            return scanners;
        }

    }
}
