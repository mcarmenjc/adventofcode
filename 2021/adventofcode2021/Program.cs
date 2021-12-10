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
