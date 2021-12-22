using System;
using System.Collections.Generic;
using System.Text;

namespace adventofcode2021.Days
{
    public abstract class Day
    {
        public virtual void Run() {}

        internal void PrintDayHeader(int day) 
        {
            Console.WriteLine();
            Console.WriteLine("-----------------------------");
            Console.WriteLine($"|           DAY {day}           |");
            Console.WriteLine("-----------------------------");
        }

        internal void PrintPart(int part, string value)
        {
            Console.WriteLine($" Part {part} => {value}");
        }
    }
}
