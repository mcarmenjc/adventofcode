using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace adventofcode2021.Days
{
    public class Day22 : Day
    {
        public class Step
        {
            public string Action { get; set; }
            public int[] X { get; set; }
            public int[] Y { get; set; }
            public int[] Z { get; set; }

        }

        public class Cube
        {
            public int[] X { get; set; }
            public int[] Y { get; set; }
            public int[] Z { get; set; }
            public long Volume { 
                get {
                    return (long)(X[1] - X[0] + 1) * (long)(Y[1] - Y[0] + 1) * (long)(Z[1] - Z[0] + 1);
                } 
            }
        }

        public override void Run()
        {
            PrintDayHeader(22);
            IList<Step> steps = ParseFile();

            HashSet<Tuple<int, int, int>> initCubes = GetInitializationCubes(steps);
            PrintPart(1, $"{initCubes.Count}");

            long numCubesAfterReboot = GetNumberOfCubesOnAfterReboot(steps);
            PrintPart(2, $"{numCubesAfterReboot}");
        }

        private long GetNumberOfCubesOnAfterReboot(IList<Step> steps)
        {
            IList<Cube> cubes = RebootSteps(steps);
            long numCubes = 0;

            foreach(Cube cube in cubes)
            {
                numCubes += cube.Volume;
            }

            return numCubes;
        }

        private IList<Cube> RebootSteps(IList<Step> steps)
        {
            IList<Cube> cubes = new List<Cube>();

            foreach (Step step in steps)
            {
                cubes = ApplyStep(step, cubes);
            }

            return cubes;
        }

        private IList<Cube> ApplyStep(Step step, IList<Cube> cubes)
        {
            IList<Cube> newCubes = new List<Cube>();

            foreach (Cube cube in cubes)
            {
                if (DoesStepAndCubeInstersect(cube, step))
                {
                    if (cube.X[0] <= step.X[1] && step.X[1] <= cube.X[1])
                    {
                        Cube newCube = new Cube()
                        {
                            X = new int[] { step.X[1] + 1, cube.X[1] },
                            Y = new int[] { cube.Y[0], cube.Y[1] },
                            Z = new int[] { cube.Z[0], cube.Z[1] }
                        };
                        newCubes.Add(newCube);
                        cube.X[1] = step.X[1];
                    }

                    if (cube.X[0] <= step.X[0] && step.X[0] <= cube.X[1])
                    {
                        Cube newCube = new Cube()
                        {
                            X = new int[] { cube.X[0], step.X[0]-1 },
                            Y = new int[] { cube.Y[0], cube.Y[1] },
                            Z = new int[] { cube.Z[0], cube.Z[1] }
                        };
                        newCubes.Add(newCube);
                        cube.X[0] = step.X[0];
                    }

                    if (cube.Y[0] <= step.Y[1] && step.Y[1] <= cube.Y[1])
                    {
                        Cube newCube = new Cube()
                        {
                            X = new int[] { cube.X[0], cube.X[1] },
                            Y = new int[] { step.Y[1] + 1, cube.Y[1] },
                            Z = new int[] { cube.Z[0], cube.Z[1] }
                        };
                        newCubes.Add(newCube);
                        cube.Y[1] = step.Y[1];
                    }

                    if (cube.Y[0] <= step.Y[0] && step.Y[0] <= cube.Y[1])
                    {
                        Cube newCube = new Cube()
                        {
                            X = new int[] { cube.X[0], cube.X[1] },
                            Y = new int[] { cube.Y[0], step.Y[0] - 1 },
                            Z = new int[] { cube.Z[0], cube.Z[1] }
                        };
                        newCubes.Add(newCube);
                        cube.Y[0] = step.Y[0];
                    }
                    
                    if (cube.Z[0] <= step.Z[1] && step.Z[1] <= cube.Z[1])
                    {
                        Cube newCube = new Cube()
                        {
                            X = new int[] { cube.X[0], cube.X[1] },
                            Y = new int[] { cube.Y[0], cube.Y[1] },
                            Z = new int[] { step.Z[1] + 1, cube.Z[1] }
                        };
                        newCubes.Add(newCube);
                        cube.Z[1] = step.Z[1];
                    }

                    if (cube.Z[0] <= step.Z[0] && step.Z[0] <= cube.Z[1])
                    {
                        Cube newCube = new Cube()
                        {
                            X = new int[] { cube.X[0], cube.X[1] },
                            Y = new int[] { cube.Y[0], cube.Y[1] },
                            Z = new int[] { cube.Z[0], step.Z[0] - 1 }
                        };
                        newCubes.Add(newCube);
                        cube.Z[0] = step.Z[0];
                    }
                }
                else
                {
                    newCubes.Add(cube);
                }
            }

            if (step.Action == "on")
            {
                newCubes.Add(new Cube()
                {
                    X = new int[] { step.X[0], step.X[1] },
                    Y = new int[] { step.Y[0], step.Y[1] },
                    Z = new int[] { step.Z[0], step.Z[1] }
                });
            }

            return newCubes;
        }

        private bool DoesStepAndCubeInstersect(Cube cube, Step step)
        {
            return (((cube.X[0] <= step.X[0] && step.X[0] <= cube.X[1]) || (step.X[0] <= cube.X[0] && cube.X[0] <= step.X[1])) &&
                ((cube.Y[0] <= step.Y[0] && step.Y[0] <= cube.Y[1]) || (step.Y[0] <= cube.Y[0] && cube.Y[0] <= step.Y[1])) &&
                ((cube.Z[0] <= step.Z[0] && step.Z[0] <= cube.Z[1]) || (step.Z[0] <= cube.Z[0] && cube.Z[0] <= step.Z[1])));
        }

        private static IList<Step> ParseFile()
        {
            string[] lines = System.IO.File.ReadAllLines(@".\Inputs\day22.txt");
            IList<Step> steps = new List<Step>();

            foreach (string line in lines)
            {
                Step s = new Step();

                var match = Regex.Match(line, @"(\w\w)\sx=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)");
                s.Action = match.Groups[1].Value;
                s.X = new int[2] { Int32.Parse(match.Groups[2].Value), Int32.Parse(match.Groups[3].Value) };
                s.Y = new int[2] { Int32.Parse(match.Groups[4].Value), Int32.Parse(match.Groups[5].Value) };
                s.Z = new int[2] { Int32.Parse(match.Groups[6].Value), Int32.Parse(match.Groups[7].Value) };

                steps.Add(s);
            }

            return steps;
        }

        private HashSet<Tuple<int, int, int>> GetInitializationCubes(IList<Step> steps)
        {
            HashSet<Tuple<int, int, int>> cubes = new HashSet<Tuple<int, int, int>>();

            foreach(Step step in steps)
            {
                int minX = Math.Max(step.X[0], -50);
                int maxX = Math.Min(step.X[1], 50);
                int minY = Math.Max(step.Y[0], -50);
                int maxY = Math.Min(step.Y[1], 50);
                int minZ = Math.Max(step.Z[0], -50);
                int maxZ = Math.Min(step.Z[1], 50);

                for (int x = minX; x <= maxX; x++)
                {
                    for (int y = minY; y <= maxY; y++)
                    {
                        for (int z = minZ; z <= maxZ; z++)
                        {
                            Tuple<int, int, int> cube = new Tuple<int, int, int>(x, y, z);
                            if (step.Action == "on")
                            {
                                cubes.Add(cube);
                            }
                            else
                            {
                                if (cubes.Contains(cube))
                                {
                                    cubes.Remove(cube);
                                }
                            }
                        }
                    }
                }
            }

            return cubes;
        }
    }
}
