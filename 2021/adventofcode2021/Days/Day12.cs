using System;
using System.Collections.Generic;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day12 : Day
    {
        private IDictionary<string, IList<string>> _cavesGraph;

        public override void Run()
        {
            PrintDayHeader(12);
            ParseFile();

            int pathsToExit = GetPathsToExit("start", new HashSet<string>());
            PrintPart(1, $"{pathsToExit}");

            int pathsToExitWithRepeatedSmallCave = GetPathsToExit("start", new HashSet<string>(), null, 0, new HashSet<string>(), string.Empty);
            PrintPart(2, $"{pathsToExitWithRepeatedSmallCave}");
        }

        private void ParseFile()
        {
            string[] lines = System.IO.File.ReadAllLines(@".\Inputs\day12.txt");
            _cavesGraph = new Dictionary<string, IList<string>>();

            foreach (string line in lines)
            {
                string[] caves = line.Split("-");

                if (!_cavesGraph.ContainsKey(caves[0]))
                {
                    _cavesGraph.Add(caves[0], new List<string>());
                }

                if (!_cavesGraph.ContainsKey(caves[1]))
                {
                    _cavesGraph.Add(caves[1], new List<string>());
                }

                _cavesGraph[caves[0]].Add(caves[1]);
                _cavesGraph[caves[1]].Add(caves[0]);
            }
        }
                
        private int GetPathsToExit(string node, HashSet<string> visited)
        {
            if (node == "end")
            {
                return 1;
            }

            if (IsSmallCave(node))
            {
                visited.Add(node);
            }
            
            int numPathsFromNode = 0;

            foreach (string nextNode in _cavesGraph[node])
            {
                if (!visited.Contains(nextNode))
                {
                    numPathsFromNode += GetPathsToExit(nextNode, visited);
                }
            }

            visited.Remove(node);

            return numPathsFromNode;
        }

        private int GetPathsToExit(string node, HashSet<string> visited, string smallCave, int numTimesVisited, HashSet<string> paths, string currentPath)
        {
            if (node == "end")
            {
                if (!paths.Contains(currentPath))
                {
                    paths.Add(currentPath);
                    return 1;
                }

                return 0;
            }

            if (smallCave == node)
            {
                numTimesVisited++;
            }

            if (IsSmallCave(node))
            {
                if (node == "start" || smallCave != node || (smallCave == node && numTimesVisited == 2))
                {
                    visited.Add(node);
                }
            }

            int numPathsFromNode = 0;

            foreach (string nextNode in _cavesGraph[node])
            {
                if (!visited.Contains(nextNode))
                {
                    if (nextNode != "end" && IsSmallCave(nextNode) && smallCave == null)
                    {
                        numPathsFromNode += GetPathsToExit(nextNode, visited, nextNode, 0, paths, node == "start" ? node : $"{currentPath}-{node}");
                    }

                    numPathsFromNode += GetPathsToExit(nextNode, visited, smallCave, numTimesVisited, paths, node == "start" ? node : $"{currentPath}-{node}");

                }
            }

            visited.Remove(node);

            return numPathsFromNode;
        }

        private bool IsSmallCave(string cave)
        {
            return cave == cave.ToLower();
        }
    }
}
