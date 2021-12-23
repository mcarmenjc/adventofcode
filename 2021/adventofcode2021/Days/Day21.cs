using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day21 : Day
    {
        public class GameState
        {
            public int[] Scores { get; set; } = new int[2] { 0, 0 };
            public int[] Positions { get; set; } = new int[2] { 1, 1 };
            public int Turn { get; set; } = 0;
            public long Number { get; set; } = 0;

        }

        public override void Run()
        {
            PrintDayHeader(21);

            int player1 = 6;
            int player2 = 8;

            (int player1Score, int player2Score, int dieRolls) = PlayDeterministicDie(player1, player2);
            int value = (player1Score < player2Score ? player1Score : player2Score) * dieRolls;
            PrintPart(1, $"{value}");

            long[] playersWins = GetWinsPerPlayerForAllUniverses(player1, player2);
            PrintPart(2, $"{(playersWins[0] > playersWins[1] ? playersWins[0] : playersWins[1])}");
        }

        private (int player1Score, int player2Score, int dieRolls) PlayDeterministicDie(int player1Pos, int player2Pos)
        {
            int[] playersScores = new int[] { 0, 0 };
            int[] playersPos = new int[] { player1Pos, player2Pos };
            int dieRolls = 0;

            int die = 0;
            int turn = 0;

            while(playersScores[0]< 1000 && playersScores[1] < 1000)
            {
                int steps = 0;
                
                for (int i = 1; i <= 3; i++)
                {
                    die++;
                    die = (die > 100) ? die % 100 : die;
                    steps += die;
                }

                int pos = playersPos[turn] + steps;
                playersPos[turn] = (pos - 1) % 10 + 1;
                playersScores[turn] += playersPos[turn];

                dieRolls += 3;
                turn = (turn + 1) % 2;
            }

            return (playersScores[0], playersScores[1], dieRolls);
        }

        private long[] GetWinsPerPlayerForAllUniverses(int player1Pos, int player2Pos)
        {
            IList<GameState> games = new List<GameState>()
            {
                new GameState()
                {
                    Positions = new int[2] { player1Pos, player2Pos },
                    Number = 1
                }
            };

            long[] gamesWinPerPlayer = new long[2] { 0, 0 };

            while (games.Count > 0)
            {
                IList<GameState> nextGames = new List<GameState>();
                foreach (var game in games)
                {
                    IList<GameState> newGames = PlayRound(game);

                    foreach(var newGame in newGames)
                    {
                        if (newGame.Scores[0] >= 21)
                        {
                            gamesWinPerPlayer[0] += newGame.Number;
                        }
                        else
                        {
                            if (newGame.Scores[1] >= 21)
                            {
                                gamesWinPerPlayer[1] += newGame.Number;
                            }
                            else
                            {
                                nextGames.Add(newGame);
                            }
                        }
                    }
                }

                games = nextGames;
            }

            return gamesWinPerPlayer;
        }

        private IList<GameState> PlayRound(GameState game)
        {
            IDictionary<int, GameState> games = new Dictionary<int, GameState>();

            for (int i = 1; i <= 3; i++)
            {
                for (int j = 1; j <= 3; j++)
                {
                    for (int k = 1; k <= 3; k++)
                    {
                        int steps = i + j + k;

                        if (!games.ContainsKey(steps))
                        {
                            GameState newGame = new GameState()
                            {
                                Scores = new int[2] { game.Scores[0], game.Scores[1] },
                                Positions = new int[2] { game.Positions[0], game.Positions[1] },
                                Turn = game.Turn,
                                Number = 0
                            };

                            int pos = game.Positions[game.Turn] + steps;
                            newGame.Positions[newGame.Turn] = (pos - 1) % 10 + 1;
                            newGame.Scores[newGame.Turn] += newGame.Positions[newGame.Turn];
                            newGame.Turn = (newGame.Turn + 1) % 2;

                            games.Add(steps, newGame);
                        }

                        games[steps].Number++;
                    }
                }
            }

            foreach(var newGame in games.Values)
            {
                newGame.Number *= game.Number;
            }

            return games.Values.ToList();
        }
    }
}
