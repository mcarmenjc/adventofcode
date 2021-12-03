using adventofcode2021.Days;
using System;

namespace adventofcode2021
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("                  .-*_* CALENDAR *_*-.                  ");
            Console.WriteLine();
            Day1.Print();
            Day2.Print();
            Day3.Print();
            Console.WriteLine();

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
