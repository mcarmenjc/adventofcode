using adventofcode2021.Days;
using System;

namespace adventofcode2021
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.ForegroundColor = ConsoleColor.White;
            Day1 day1 = new Day1();
            int day1Part1 = day1.GetNumberOfTimesMeasurementIncreases();
            int day1Part2 = day1.GetNumberOfTimesSumOfMeasurementsInSlidingWindowIncreases();
            PrintDaySolution(1, day1Part1, day1Part2);

            Day2 day2 = new Day2();
            int day2Part1 = day2.MoveSubmarine();
            int day2Part2 = day2.MoveSubmarineWithAim();
            PrintDaySolution(2, day2Part1, day2Part2);

            Day3 day3 = new Day3();
            int day3Part1 = day3.GetPowerConsuption();
            int day3Part2 = day3.GetLifeSupportRating();
            PrintDaySolution(3, day3Part1, day3Part2);

            Day4 day4 = new Day4();
            int day4Part1 = day4.PlayBingo();
            int day4Part2 = day4.GetScoreForLastBoardToWin();
            PrintDaySolution(4, day4Part1, day4Part2);

            Day5 day5 = new Day5();
            int day5Part1 = day5.GetNumberOfPointsWhereTwoOrMoreLinesIntersectForHorizontalAndVerticalLines();
            int day5Part2 = day5.GetNumberOfPointsWhereTwoOrMoreLinesIntersect();
            PrintDaySolution(5, day5Part1, day5Part2);

            Day6 day6 = new Day6();
            long day6Part1 = day6.GetNumberOfLanternfistAfterXDays(80);
            long day6Part2 = day6.GetNumberOfLanternfistAfterXDays(256);
            PrintDaySolution(6, day6Part1, day6Part2);

            Day7 day7 = new Day7();
            long day7Part1 = day7.GetMinNumberOfFuelToAlignCrabSubmarines();
            long day7Part2 = day7.GetMinNumberOfFuelToAlignCrabSubmarinesNonLinear();
            PrintDaySolution(7, day7Part1, day7Part2);

            Day8 day8 = new Day8();
            long day8Part1 = day8.CountUniqueDigitsInOutputs();
            long day8Part2 = day8.GetSumOfAllDecodedOutputs();
            PrintDaySolution(8, day8Part1, day8Part2);

            Day9 day9 = new Day9();
            long day9Part1 = day9.GetSumOfRiskLevels();
            long day9Part2 = day9.GetValueOf3LargestBasins();
            PrintDaySolution(9, day9Part1, day9Part2);

            Day10 day10 = new Day10();
            long day10Part1 = day10.GetSyntaxErrorScore();
            long day10Part2 = day10.GetAutocompleteMiddleScore();
            PrintDaySolution(10, day10Part1, day10Part2);

            Day11 day11 = new Day11();
            long day11Part1 = day11.GetNumberOfFlashesAfterXSteps(100);
            long day11Part2 = day11.GetStepAllOctopusesFlashAtTheSameTime();
            PrintDaySolution(11, day11Part1, day11Part2);

            Day12 day12 = new Day12();
            long day12Part1 = day12.GetNumPathsToExit();
            long day12Part2 = day12.GetNumPathsToExitWithRepeatedSmallCave();
            PrintDaySolution(12, day12Part1, day12Part2);

            Day13 day13 = new Day13();
            long day13Part1 = day13.GetNumPointsAfter1stFold();
            long day13Part2 = 0;
            PrintDaySolution(13, day13Part1, day13Part2);
            day13.PrintCodeAfterFolding();

            Day14 day14 = new Day14();
            long day14Part1 = day14.CalculateMostCommonElementMinusLeastCommonElementAfterXSteps(10);
            long day14Part2 = day14.CalculateMostCommonElementMinusLeastCommonElementAfterXSteps(40);
            PrintDaySolution(14, day14Part1, day14Part2);

            Day15 day15 = new Day15();
            long day15Part1 = day15.GetRiskForSafestPathInTile();
            long day15Part2 = day15.GetRiskForSafestPathInFullMap();
            PrintDaySolution(15, day15Part1, day15Part2);

            Day16 day16 = new Day16();
            long day16Part1 = day16.GetVersionsValue();
            long day16Part2 = day16.EvaluatePacket();
            PrintDaySolution(16, day16Part1, day16Part2);

            Day17 day17 = new Day17();
            long day17Part1 = day17.CalculateHighesYPosition();
            long day17Part2 = day17.GetPossibleInitialVelocitiesToReachTarget();
            PrintDaySolution(17, day17Part1, day17Part2);
        }

        private static void PrintDaySolution(int day, double part1, double part2)
        {
            Console.WriteLine("-----------------------------");
            Console.WriteLine($"|           DAY {day}           |");
            Console.WriteLine("-----------------------------");
            Console.WriteLine($" Part 1 => {part1}");
            Console.WriteLine($" Part 2 => {part2}");
            Console.WriteLine("-----------------------------");
            Console.WriteLine();
        }
    }
}
