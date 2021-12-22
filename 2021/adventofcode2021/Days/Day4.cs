using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace adventofcode2021.Days
{
    public class Day4 : Day
    {
        public class BingoCard
        {
            public int[][] Card { get; set; }

            private IList<HashSet<int>> _rows;
            private IList<HashSet<int>> _cols;

            public BingoCard(string card)
            {
                Card = new int[5][];
                
                string[] lines = card.Split("\r\n");

                for(int i = 0; i < Card.Length; i++)
                {
                    Card[i] = Regex.Split(lines[i].Trim(), "\\s+").Select(x => Int32.Parse(x)).ToArray();
                }

                ResetCard();
            }

            public void ResetCard()
            {
                _rows = new List<HashSet<int>>();
                _cols = new List<HashSet<int>>();

                for (int i = 0; i < Card.Length; i++)
                {
                    _rows.Add(new HashSet<int>(Card[i]));

                    for (int j = 0; j < Card[i].Length; j++)
                    {
                        if (_cols.Count <= j)
                        {
                            _cols.Add(new HashSet<int>());
                        }

                        _cols[j].Add(Card[i][j]);
                    }
                }
            }

            public int PlayNumber(int number)
            {
                for (int i = 0; i < _rows.Count; i++)
                {
                    if (_rows[i].Contains(number)) 
                    {
                        _rows[i].Remove(number);
                    }

                    if (_cols[i].Contains(number))
                    {
                        _cols[i].Remove(number);
                    }
                }

                for (int i = 0; i < _rows.Count; i++)
                {
                    if (_rows[i].Count == 0)
                    {
                        return CalculateScore(number);
                    }

                    if (_cols[i].Count == 0)
                    {
                        return CalculateScore(number);
                    }
                }

                return -1;
            }

            private int CalculateScore(int number)
            {
                int score = 0;

                foreach(var row in _rows)
                {
                    foreach(int n in row)
                    {
                        score += n;
                    }
                }

                return (score * number);
            }
        }

        public override void Run()
        {
            PrintDayHeader(4);
            IList<BingoCard> cards = new List<BingoCard>();
            string day4 = System.IO.File.ReadAllText(@".\Inputs\day4.txt");
            string[] blocks = day4.Split("\r\n\r\n");
            IList<int> numbers = blocks[0].Split(",").Select(x => Int32.Parse(x)).ToList();

            for (int i = 1; i < blocks.Length; i++)
            {
                cards.Add(new BingoCard(blocks[i]));
            }

            int bingo = PlayBingo(cards, numbers);
            PrintPart(1, $"{bingo}");

            foreach (BingoCard card in cards)
            {
                card.ResetCard();
            }

            int scoreForLastBoard = GetScoreForLastBoardToWin(cards, numbers);
            PrintPart(2, $"{scoreForLastBoard}");
        }

        private int PlayBingo(IList<BingoCard> cards, IList<int> numbers)
        {
            foreach (int number in numbers)
            {
                foreach(BingoCard card in cards)
                {
                    int score = card.PlayNumber(number);
                    
                    if (score >= 0)
                    {
                        return score;
                    }
                }
            }
            return 0;
        }

        private int GetScoreForLastBoardToWin(IList<BingoCard> cards, IList<int> numbers)
        {
            IList<BingoCard> newCards = new List<BingoCard>(cards);
            int i = 0;
            int score = 0;

            while (newCards.Count > 0)
            {
                int number = numbers[i];

                for (int j = newCards.Count - 1; j >= 0; j--)
                {
                    score = newCards[j].PlayNumber(number);

                    if (score >= 0)
                    {
                        newCards.RemoveAt(j);
                    }
                }

                i++;
            }

            return score;
        }
    }
}
