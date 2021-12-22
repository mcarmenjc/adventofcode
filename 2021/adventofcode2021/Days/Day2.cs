using System;
using System.Collections.Generic;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day2 : Day
    {
        public class Position
        {
            public int X { get; set; }
            public int Y { get; set; }
        }

        private IList<Position> _course;

        public Day2()
        {
            _course = new List<Position>();
            string[] lines = System.IO.File.ReadAllLines(@".\Inputs\day2.txt");

            foreach (string line in lines)
            {
                _course.Add(ParseLine(line));
            }
        }

        public override void Run()
        {
            PrintDayHeader(2);

            IList<Position> course = ParseFile();
            int submarinePos = MoveSubmarine(course);
            PrintPart(1, $"{submarinePos}");
            
            int submarinePosWithAim = MoveSubmarineWithAim(course);
            PrintPart(2, $"{submarinePosWithAim}");
        }

        private IList<Position> ParseFile()
        {
            IList<Position> course = new List<Position>();
            string[] lines = System.IO.File.ReadAllLines(@".\Inputs\day2.txt");

            foreach (string line in lines)
            {
                course.Add(ParseLine(line));
            }

            return course;
        }

        private Position ParseLine(string line)
        {
            string[] parts = line.Split(" ");
            Position direction = new Position() { X = 0, Y = 0 };
            
            if (parts[0].Equals("forward", StringComparison.InvariantCultureIgnoreCase))
            {
                direction.X = Int32.Parse(parts[1]);
            }

            if (parts[0].Equals("down", StringComparison.InvariantCultureIgnoreCase))
            {
                direction.Y = Int32.Parse(parts[1]);
            }

            if (parts[0].Equals("up", StringComparison.InvariantCultureIgnoreCase))
            {
                direction.Y = -1 * Int32.Parse(parts[1]);
            }

            return direction;
        }

        private int MoveSubmarine(IList<Position> course)
        {
            Position submarinePosition = new Position() { X = 0, Y = 0 };

            foreach (Position direction in course)
            {
                submarinePosition.X += direction.X;
                submarinePosition.Y += direction.Y;
            }

            return (submarinePosition.X * submarinePosition.Y);
        }

        private int MoveSubmarineWithAim(IList<Position> course)
        {
            Position submarinePosition = new Position() { X = 0, Y = 0 };
            int aim = 0;

            foreach (Position direction in course)
            {
                if (direction.X != 0)
                {
                    submarinePosition.X += direction.X;
                    submarinePosition.Y += aim * direction.X;
                }
                else
                {
                    aim += direction.Y;
                }
            }

            return (submarinePosition.X * submarinePosition.Y);
        }
    }
}
