using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day23 : Day
    {
        public class Burrow : IComparable
        {
            public long Energy { get; set; }
            public char[][] Rooms { get; set; }
            public char[] Hallway { get; set; }
            public long Remaining
            {
                get
                {
                    long value = 0;

                    for (int i = 0; i < Hallway.Length; i++)
                    {
                        if (Hallway[i] != '.')
                        {
                            int distance = 1 + Math.Abs(i - _roomEntrance[Hallway[i]]);
                            value += _energy[Hallway[i]] * distance;
                        }
                    }

                    for (int i = 0; i < Rooms.Length; i++)
                    {
                        for (int j = 0; j < Rooms[i].Length; j++)
                        {
                            char current = Rooms[i][j];
                            char roomType = (char)('A' + i);

                            if (current != '.' && _roomEntrance[current] != _roomEntrance[roomType])
                            {
                                int distance = 2 + Math.Abs(_roomEntrance[roomType] - _roomEntrance[current]);
                                value += _energy[current] * distance;
                            }
                        }
                    }

                    return value;
                }
            }

            private IDictionary<char, int> _energy = new Dictionary<char, int>()
            {
                { 'A', 1 },
                { 'B', 10 },
                { 'C', 100 },
                { 'D', 1000 }
            };

            private IDictionary<char, int> _roomEntrance = new Dictionary<char, int>() 
            {
                { 'A', 2 },
                { 'B', 4 },
                { 'C', 6 },
                { 'D', 8 }
            };

            public Burrow (string[] initialState, string[] extraAmphipods)
            {
                Energy = 0;
                int roomSize = 2 + extraAmphipods.Length;

                Rooms = new char[4][];

                Hallway = "...........".ToCharArray();

                for (int i = 0, j = 3; i < Rooms.Length; i++, j+=2)
                {
                    Rooms[i] = new char[roomSize];
                    Rooms[i][0] = initialState[2][j];
                    Rooms[i][1] = extraAmphipods[0][j];
                    Rooms[i][2] = extraAmphipods[1][j];
                    Rooms[i][3] = initialState[3][j];
                }
            }

            public Burrow(string[] initialState)
            {
                Energy = 0;
                Rooms = new char[4][];

                Hallway = "...........".ToCharArray();

                for (int i = 0, j = 3; i < Rooms.Length; i++, j += 2)
                {
                    Rooms[i] = new char[2];
                    Rooms[i][0] = initialState[2][j];
                    Rooms[i][1] = initialState[3][j];
                }
            }

            public Burrow(long energy, char[][]rooms, char[] hallway)
            {
                Energy = energy;
                Rooms = new char[4][];
                Hallway = new char[hallway.Length];

                for (int i = 0; i < rooms.Length; i++)
                {
                    Rooms[i] = new char[rooms[i].Length];
                    for(int j = 0; j < rooms[i].Length; j++)
                    {
                        Rooms[i][j] = rooms[i][j];
                    }
                }

                for (int i = 0; i < hallway.Length; i++)
                {
                    Hallway[i] = hallway[i];
                }
            }

            public bool IsOrganized()
            {
                for (int i = 0; i < Rooms.Length; i++)
                {
                    char roomType = (char)('A' + i);

                    if (Rooms[i].Distinct().Count() != 1 || Rooms[i][0] != roomType)
                    {
                        return false;
                    }
                }

                return true;
            }

            public IList<Burrow> GetPossibleNextStates()
            {
                IList<Burrow> nextStates = new List<Burrow>();

                for (int i = 0; i < Hallway.Length; i++)
                {
                    if (CanMoveToRoom(i))
                    {
                        nextStates.Add(MoveToRoom(i));
                    }
                }

                for (int i = 0; i < Rooms.Length; i++)
                {
                    for (int j = 0; j < Hallway.Length; j++)
                    {
                        if (CanMoveToHallway(i, j))
                        {
                            nextStates.Add(MoveToHallway(i, j));
                        }
                    }
                }

                return nextStates;
            }

            public static bool operator ==(Burrow a, Burrow b)
            {
                string aHallway = string.Join("", a.Hallway);
                string bHallway = string.Join("", b.Hallway);

                string aRooms = string.Join("", a.Rooms.Select(x => string.Join("", x)));
                string bRooms = string.Join("", b.Rooms.Select(x => string.Join("", x)));

                return a.Energy == b.Energy && aHallway == bHallway && aRooms == bRooms;
            }

            public static bool operator !=(Burrow a, Burrow b)
            {
                return !(a == b);
            }

            public override bool Equals(object obj)
            {
                return this == (Burrow)(obj);
            }

            public override int GetHashCode()
            {
                string hallway = string.Join("", Hallway);
                string rooms = string.Join("", Rooms.Select(x => string.Join("", x)));
                return (hallway, rooms, Energy).GetHashCode();
            }

            private bool CanMoveToHallway(int room, int pos)
            {
                char roomType = (char)('A' + room);
                int roomEntrance = _roomEntrance[roomType];

                return (!_roomEntrance.Values.Contains(pos) && !IsRoomEmpty(room) && IsThereAmphipodsToMove(room) && IsPathToHallwayFree(pos, roomEntrance));
            }

            private bool IsPathToHallwayFree(int pos, int roomEntrance)
            {
                int step = roomEntrance < pos ? -1 : 1;
                int distance = Math.Abs(roomEntrance - pos) + 1;

                for (int i = 0; i < distance; i++)
                {
                    int newPos = pos + step * i;
                    if (Hallway[newPos] != '.')
                    {
                        return false;
                    }
                }

                return true;
            }

            private Burrow MoveToHallway(int room, int pos)
            {
                Burrow newState = new Burrow(Energy, Rooms, Hallway);
                char roomType = (char)('A' + room);
                int roomEntrance = _roomEntrance[roomType];
                int distance = Math.Abs(pos - roomEntrance) + 1;
                int i = 0;

                while (i < Rooms[room].Length && Rooms[room][i] == '.')
                {
                    distance++;
                    i++;
                }

                newState.Hallway[pos] = newState.Rooms[room][i];
                newState.Rooms[room][i] = '.';

                newState.Energy = Energy + distance * _energy[Rooms[room][i]];

                return newState;
            }

            private bool IsThereAmphipodsToMove(int room)
            {
                char roomType = (char)('A' + room);

                return Rooms[room].Any(x => x != '.' && x != roomType);
            }

            private bool IsRoomEmpty(int room)
            {
                return Rooms[room].Distinct().Count() == 1 && Rooms[room][0] == '.';
            }

            private bool CanMoveToRoom(int pos)
            {
                if (Hallway[pos] == '.')
                {
                    return false;
                }

                int roomNo = Hallway[pos] - 'A';

                return IsRoomAvailable(roomNo) && IsPathToRoomFree(pos, _roomEntrance[Hallway[pos]]);
            }

            private Burrow MoveToRoom(int pos)
            {
                Burrow newState = new Burrow(Energy, Rooms, Hallway);
                int roomNo = Hallway[pos] - 'A';
                int distance = Math.Abs(_roomEntrance[Hallway[pos]] - pos);
                int i = 0;

                while (i < Rooms[roomNo].Length && Rooms[roomNo][i] == '.')
                {
                    distance++;
                    i++;
                }

                newState.Rooms[roomNo][i-1] = Hallway[pos];
                newState.Hallway[pos] = '.';

                newState.Energy = Energy + distance * _energy[Hallway[pos]];

                return newState;
            }

            private bool IsPathToRoomFree(int pos, int roomEntrance)
            {
                int step = roomEntrance < pos ? -1 : 1;
                int distance = Math.Abs(roomEntrance - pos);

                for (int i = 1; i <= distance; i++)
                {
                    int newPos = pos + step * i;
                    if (Hallway[newPos] != '.')
                    {
                        return false;
                    }
                }

                return true;
            }

            private bool IsRoomAvailable(int room)
            {
                IList<char> options = Rooms[room].Distinct().ToList();
                char roomType = (char)('A' + room);

                return ((options.Count == 1 && options[0] == '.') || (options.Count == 2 && options.Contains('.') && options.Contains(roomType)));
            }

            public int CompareTo(object obj)
            {
                Burrow other = obj as Burrow;
                return (Energy + Remaining).CompareTo(other.Energy + other.Remaining);
            }
        }

        public override void Run()
        {
            PrintDayHeader(23);
            string[] lines = System.IO.File.ReadAllLines(@".\Inputs\day23.txt");
            Burrow burrow = new Burrow(lines);
            long energy = FindMostEfficientWayToOrganizeBurrow(burrow);
            PrintPart(1, $"{energy}");

            Burrow extendedBurrow = new Burrow(lines, new string[]
            {
                "  #D#C#B#A#",
                "  #D#B#A#C#"
            });
            long energy2 = FindMostEfficientWayToOrganizeBurrow(extendedBurrow);
            PrintPart(2, $"{energy2}");
        }

        private long FindMostEfficientWayToOrganizeBurrow(Burrow burrow)
        {
            long energy = Int64.MaxValue;
            HashSet<Burrow> burrows = new HashSet<Burrow>();
            burrows.Add(burrow);

            while(burrows.Count > 0)
            {
                Burrow currentState = burrows.First();
                burrows.Remove(currentState);

                IList<Burrow> nextStates = currentState.GetPossibleNextStates();

                foreach (Burrow next in nextStates)
                {
                    if (next.IsOrganized())
                    {
                        if (energy > next.Energy)
                        {
                            energy = next.Energy;
                        }
                    }
                    else
                    {
                        if (next.Energy + next.Remaining < energy)
                        {
                            burrows.Add(next);
                        }
                    }
                }
            }

            return energy;
        }
    }
}
