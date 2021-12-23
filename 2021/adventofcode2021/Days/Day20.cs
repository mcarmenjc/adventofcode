using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day20 : Day
    {
        public override void Run()
        {
            PrintDayHeader(20);

            string[] lines = System.IO.File.ReadAllLines(@".\Inputs\day20.txt");

            char[] algorithm = lines[0].ToCharArray();

            IList<IList<char>> image = new List<IList<char>>();

            for (int i = 2; i < lines.Length; i++)
            {
                image.Add(lines[i].ToCharArray().ToList());
            }

            IList<IList<char>> enhancedImg = EnhanceImage(image, algorithm, 2);
            int numLightPixels = CountLightPixels(enhancedImg);

            PrintPart(1, $"{numLightPixels}");

            enhancedImg = EnhanceImage(image, algorithm, 50);
            numLightPixels = CountLightPixels(enhancedImg);
            PrintPart(2, $"{numLightPixels}");
        }

        private int CountLightPixels(IList<IList<char>> image)
        {
            int count = 0;

            foreach (var row in image)
            {
                foreach(var pixel in row)
                {
                    if (pixel == '#')
                    {
                        count++;
                    }
                }
            }

            return count;
        }

        private IList<IList<char>> EnhanceImage(IList<IList<char>> image, char[] algorithm, int steps)
        {
            IList<IList<char>> enhancedImg = image;
            for (int i = 0; i < steps; i++)
            {
                char background = algorithm[0] == '.' ? '.' : (i % 2 == 0 ? '.' : '#');
                ExpandImage(enhancedImg, background);
                enhancedImg = ApplyAlgorithm(enhancedImg, algorithm, background);
            }

            return enhancedImg;
        }

        private IList<IList<char>> ApplyAlgorithm(IList<IList<char>> image, char[] algorithm, char background)
        {
            IList<IList<char>> enhancedImage = new List<IList<char>>();

            for (int i = 0; i < image.Count; i++)
            {
                IList<char> row = new List<char>();

                for (int j = 0; j < image[i].Count; j++)
                {
                    char[] bits = new char[9];
                    int m = 0;

                    for (int k = -1; k <= 1; k++)
                    {
                        for (int l = -1; l <= 1; l++)
                        {
                            bits[m] = (i + k >= 0 && i + k < image.Count && j + l >= 0 && j + l < image[i].Count) ? (image[i + k][j + l] == '.' ? '0' : '1') : (background == '#' ? '1' : '0');
                            m++;
                        }
                    }

                    int pos = Convert.ToInt32(string.Join("", bits), 2);
                    row.Add(algorithm[pos]);
                }

                enhancedImage.Add(row);
            }

            return enhancedImage;
        }

        private void ExpandImage(IList<IList<char>> image, char background)
        {
            image.Insert(0, new List<char>());
            image.Add(new List<char>());

            for (int i = 0; i < image[1].Count + 2; i++)
            {
                image[0].Add(background);
                image[image.Count-1].Add(background);
            }

            for (int i = 1; i < image.Count - 1; i++)
            {
                image[i].Insert(0, background);
                image[i].Add(background);
            }
        }
    }
}
