using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day24 : Day
    {
        public class Instruction
        {
            public string Operator { get; set; }
            public string[] Operands { get; set; }
        }

        public override void Run()
        {
            PrintDayHeader(24);

            IList<IList<Instruction>> monad = ParseFile();
            int[] v1 = new int[monad.Count];
            int[] v2 = new int[monad.Count];
            int[] v3 = new int[monad.Count];

            for (int i = 0; i < monad.Count; i++)
            {
                v1[i] = Int32.Parse(monad[i][4].Operands[1]);
                v2[i] = Int32.Parse(monad[i][3].Operands[1]);
                v3[i] = Int32.Parse(monad[i][14].Operands[1]);
            }

            int[] modelNumber = new int[14];

            RunMonad(v1, v2, v3, modelNumber, 0, 0, -1);
            PrintPart(1, string.Join("", modelNumber));

            RunMonad(v1, v2, v3, modelNumber, 0, 0, 1);
            PrintPart(2, string.Join("", modelNumber));
        }

        public bool RunMonad(int[] v1, int[] v2, int[] v3, int[] input, int pos, long z, int step)
        {
            if (pos == input.Length)
            {
                return z == 0;
            }

            int from = 9;
            int to = 0;

            if (step == 1)
            {
                from = 1;
                to = 10;
            }

            int w = from;
            while (w != to)
            {
                input[pos] = w;
                long newZ = z;

                if ((z % 26) + v1[pos] == w)
                {
                    if (v2[pos] == 26)
                    {
                        newZ = newZ / v2[pos];
                    }
                }
                else
                {
                    if (v2[pos] == 1)
                    {
                        newZ = 26 * (newZ / v2[pos]) + w + v3[pos];
                    }
                }

                if (newZ != z && RunMonad(v1, v2, v3, input, pos + 1, newZ, step)) 
                {
                    return true;
                }

                w += step;
            }

            return false;
        }

        private IList<IList<Instruction>> ParseFile()
        {
            string[] lines = System.IO.File.ReadAllLines(@".\Inputs\day24.txt");
            IList<IList<Instruction>> monad = new List<IList<Instruction>>();

            foreach (string line in lines)
            {
                if (line.Contains("inp"))
                {
                    monad.Add(new List<Instruction>());
                }
                else
                {
                    string[] parts = line.Split(" ");

                    monad.Last().Add(new Instruction()
                    {
                        Operator = parts[0],
                        Operands = new string[] { parts[1], parts[2] }
                    });
                }
            }

            return monad;
        }
    }
}
