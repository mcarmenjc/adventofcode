using adventofcode2021.Days;
using System;

namespace adventofcode2021
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("                  .-*_* CALENDAR *_*-.                  ");
            Console.WriteLine();
            Day1.Print();
            Console.WriteLine();

            Console.WriteLine("Day 1");
            Day1 day1 = new Day1();
            Console.WriteLine($"Part 1 = {day1.GetNumberOfTimesMeasurementIncreases()}");
            Console.WriteLine($"Part 2 = {day1.GetNumberOfTimesSumOfMeasurementsInSlidingWindowIncreases()}");
        }
    }
}
