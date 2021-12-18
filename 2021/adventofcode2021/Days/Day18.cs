using System;
using System.Collections.Generic;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day18
    {

        public class SnailNumber
        {
            public int Value { get; set; }
            public SnailNumber Left { get; set; }
            public SnailNumber Right { get; set; }
            public SnailNumber Parent { get; set; }
        }

        private IList<SnailNumber> _numbers;

        public Day18()
        {
            string[] lines = System.IO.File.ReadAllLines(@".\Inputs\day18.txt");
            _numbers = new List<SnailNumber>();

            foreach (string line in lines)
            {
                _numbers.Add(ParseNumber(line));
            }
        }

        private SnailNumber ParseNumber(string line)
        {
            SnailNumber root = new SnailNumber()
            {
                Parent = null,
                Value = -1
            };

            SnailNumber number = root;

            foreach (char c in line) 
            { 
                if (c == '[')
                {
                    number.Left = new SnailNumber()
                    {
                        Parent = number,
                        Value = -1
                    };

                    number = number.Left;
                }

                if (c >= '0' && c <= '9')
                {
                    number.Value = c - '0';
                }

                if (c == ',')
                {
                    number = number.Parent;
                    number.Right = new SnailNumber()
                    {
                        Parent = number,
                        Value = -1
                    };

                    number = number.Right;
                }

                if (c == ']')
                {
                    number = number.Parent;
                }
            }

            return root;
        }

        public int CalculateMagnitudOfSum()
        {
            SnailNumber sum = CopyNumber(_numbers[0]);
            for (int i = 1; i < _numbers.Count; i++)
            {
                sum = AddTwoNumbers(sum, CopyNumber(_numbers[i]));
            }

            return GetNumberMagnitude(sum);
        }

        public int GetLargestMagnitudOfAnyTwoNumbers()
        {
            int maxMagnitud = 0;

            for (int i = 0; i < _numbers.Count; i++)
            {
                for (int j = 0; j < _numbers.Count; j++)
                {
                    if (i != j)
                    {
                        SnailNumber sum = AddTwoNumbers(CopyNumber(_numbers[i]), CopyNumber(_numbers[j]));
                        int magnitud = GetNumberMagnitude(sum);

                        if (maxMagnitud < magnitud)
                        {
                            maxMagnitud = magnitud;
                        }
                    }
                }
            }

            return maxMagnitud;
        }

        private int GetNumberMagnitude(SnailNumber number)
        {
            if (number.Value != -1)
            {
                return number.Value;
            }

            return 3 * GetNumberMagnitude(number.Left) + 2 * GetNumberMagnitude(number.Right);
        }

        private void PrintNumber (SnailNumber number)
        {
            if (number.Value != -1)
            {
                Console.Write(number.Value);
            }
            else
            {
                Console.Write("[");
                PrintNumber(number.Left);
                Console.Write(",");
                PrintNumber(number.Right);
                Console.Write("]");
            }
        }

        private SnailNumber AddTwoNumbers(SnailNumber n1, SnailNumber n2)
        {
            SnailNumber n = new SnailNumber()
            {
                Left = n1,
                Right = n2,
                Parent = null,
                Value = -1
            };

            n1.Parent = n;
            n2.Parent = n;

            bool reduced = false;

            do
            {
                reduced = ReduceNumber(n);
            } while (reduced);

            return n;
        }

        private SnailNumber CopyNumber(SnailNumber orig)
        {
            SnailNumber copy = new SnailNumber()
            {
                Value = orig.Value
            };

            if (orig.Value == -1)
            {
                copy.Left = CopyNumber(orig.Left);
                copy.Right = CopyNumber(orig.Right);

                copy.Left.Parent = copy;
                copy.Right.Parent = copy;
            }
            
            return copy;
        }

        private bool ReduceNumber(SnailNumber number)
        {
            bool somethingExploded = ExplodeNumber(number, 0);

            if (!somethingExploded)
            {
                return SplitNumber(number);
            }

            return somethingExploded;
        }

        private bool SplitNumber (SnailNumber number)
        {
            if (number.Value == -1)
            {
                return SplitNumber(number.Left) || SplitNumber(number.Right);
            }

            if (number.Value >= 10)
            {
                number.Left = new SnailNumber()
                {
                    Parent = number,
                    Value = (int)Math.Floor((double)number.Value/2)
                };
                
                number.Right = new SnailNumber()
                {
                    Parent = number,
                    Value = (int)Math.Ceiling((double)number.Value / 2)
                };

                number.Value = -1;

                return true;
            }

            return false;
        }

        private bool ExplodeNumber (SnailNumber number, int depth)
        {
            if (!IsLeafPair(number))
            {
                return (number.Left.Value == -1 && ExplodeNumber(number.Left, depth + 1)) || (number.Right.Value == -1 && ExplodeNumber(number.Right, depth + 1));
            }

            if (depth == 4)
            {
                AddToFirstNumberOnTheLeft(number, number.Left.Value);
                AddToFirstNumberOnTheRight(number, number.Right.Value);

                number.Left = null;
                number.Right = null;
                number.Value = 0;

                return true;
            }

            return false;
        }

        private void AddToFirstNumberOnTheRight(SnailNumber number, int value)
        {
            var nextRight = number;

            while (nextRight.Parent != null && nextRight.Parent.Right == nextRight)
            {
                nextRight = nextRight.Parent;
            }

            if (nextRight.Parent != null)
            {
                nextRight = nextRight.Parent.Right;

                while (nextRight.Value == -1)
                {
                    nextRight = nextRight.Left;
                }

                nextRight.Value += value;
            }
        }

        private void AddToFirstNumberOnTheLeft(SnailNumber number, int value)
        {
            var nextLeft = number;

            while (nextLeft.Parent != null && nextLeft.Parent.Left == nextLeft)
            {
                nextLeft = nextLeft.Parent;
            }

            if (nextLeft.Parent != null)
            {
                nextLeft = nextLeft.Parent.Left;

                while (nextLeft.Value == -1)
                {
                    nextLeft = nextLeft.Right;
                }

                nextLeft.Value += value;
            }
        }

        private bool IsLeafPair (SnailNumber number)
        {
            return (number.Left.Value != -1 && number.Right.Value != -1);
        }
    }
}
 