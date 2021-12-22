using System;
using System.Collections.Generic;
using System.Text;

namespace adventofcode2021.Days
{
    public class Day16 : Day
    {

        public class Packet
        {
            public int Version { get; set; }
            public int Type { get; set; }
        }

        public class OperatorPacket : Packet
        {
            public int Id { get; set; }
            public int Length { get; set; }
            public IList<Packet> SubPackets { get; set; }
        }

        public class LiteralPacket : Packet
        {            
            public long Value { get; set; }
        }

        public Day16()
        {
            PrintDayHeader(16);
            string file = System.IO.File.ReadAllText(@".\Inputs\day16.txt");
            Packet packet = ParsePacket(file);

            int sumOfVersions = AddAllVersions(packet);
            PrintPart(1, $"{sumOfVersions}");

            long packetResult = EvaluatePacket(packet);
            PrintPart(2, $"{packetResult}");
        }

        private long EvaluatePacket(Packet packet)
        {
            if (packet is LiteralPacket)
            {
                return (packet as LiteralPacket).Value;
            }

            OperatorPacket opPacket = packet as OperatorPacket;

            if (opPacket.Type == 0)
            {
                return SumUpAllValues(opPacket.SubPackets);
            }

            if (opPacket.Type == 1)
            {
                return MultiplyAllValues(opPacket.SubPackets);
            }

            if (opPacket.Type == 2)
            {
                return MinValue(opPacket.SubPackets);
            }

            if (opPacket.Type == 3)
            {
                return MaxValue(opPacket.SubPackets);
            }

            if (opPacket.Type == 5)
            {
                return GreaterThan(opPacket.SubPackets);
            }

            if (opPacket.Type == 6)
            {
                return LessThan(opPacket.SubPackets);
            }

            if (opPacket.Type == 7)
            {
                return EqualTo(opPacket.SubPackets);
            }

            return 0;
        }

        private long MultiplyAllValues(IList<Packet> subPackets)
        {
            long result = 1;

            foreach (Packet p in subPackets)
            {
                result *= EvaluatePacket(p);
            }

            return result;
        }

        private long EqualTo(IList<Packet> subPackets)
        {
            return EvaluatePacket(subPackets[0]) == EvaluatePacket(subPackets[1]) ? 1 : 0;
        }

        private long LessThan(IList<Packet> subPackets)
        {
            return EvaluatePacket(subPackets[0]) < EvaluatePacket(subPackets[1]) ? 1 : 0;
        }

        private long GreaterThan(IList<Packet> subPackets)
        {
            return EvaluatePacket(subPackets[0]) > EvaluatePacket(subPackets[1]) ? 1 : 0;
        }

        private long MaxValue(IList<Packet> subPackets)
        {
            long max = 0;

            foreach(Packet p in subPackets)
            {
                long value = EvaluatePacket(p);

                if (max < value)
                {
                    max = value;
                }
            }

            return max;
        }

        private long MinValue(IList<Packet> subPackets)
        {
            long min = Int64.MaxValue;

            foreach (Packet p in subPackets)
            {
                long value = EvaluatePacket(p);

                if (min > value)
                {
                    min = value;
                }
            }

            return min;
        }

        private long SumUpAllValues(IList<Packet> subPackets)
        {
            long result = 0;

            foreach (Packet p in subPackets)
            {
                result += EvaluatePacket(p);
            }

            return result;
        }

        private int AddAllVersions(Packet packet)
        {
            if (packet is LiteralPacket)
            {
                return packet.Version;
            }

            int versions = packet.Version;
            OperatorPacket opPacket = packet as OperatorPacket;

            foreach (Packet subpacket in opPacket.SubPackets)
            {
                versions += AddAllVersions(subpacket);
            }

            return versions;
        }

        private Packet ParsePacket(string hex)
        {
            char[] bits = TranslateFromHexToBinary(hex);
            int pos = 0;

            Packet packet = ParsePacket(bits, ref pos);

            return packet;
        }

        private Packet ParsePacket(char[] bits, ref int pos)
        {
            Packet packet;
            int version = Parse3Bits($"{bits[pos]}{bits[pos+1]}{bits[pos+2]}");
            pos += 3;
            int type = Parse3Bits($"{bits[pos]}{bits[pos + 1]}{bits[pos + 2]}");
            pos += 3;

            if (type == 4)
            {
                packet = ParseLiteralPacket(bits, ref pos, version, type);
            }
            else
            {
                packet = ParseOperatorPacket(bits, ref pos, version, type);
            }

            return packet;
        }

        private OperatorPacket ParseOperatorPacket(char[] bits, ref int pos, int version, int type)
        {
            OperatorPacket packet = new OperatorPacket()
            {
                Version = version,
                Type = type,
                Id = bits[pos] - '0',
                SubPackets = new List<Packet>()
            };

            packet.Length = ParseOperatorLength(bits, ref pos);

            if (packet.Id == 1)
            {
                for (int i = 0; i < packet.Length; i++)
                {
                    Packet subpacket = ParsePacket(bits, ref pos);
                    packet.SubPackets.Add(subpacket);
                }
            }
            else
            {
                char[] subPackagesBits = new char[packet.Length];
                Array.Copy(bits, pos, subPackagesBits, 0, packet.Length);

                int subPacketPos = 0;

                while (subPacketPos < packet.Length)
                {
                    Packet subpacket = ParsePacket(subPackagesBits, ref subPacketPos);
                    packet.SubPackets.Add(subpacket);
                }

                pos += packet.Length;
            }

            return packet;
        }


        private LiteralPacket ParseLiteralPacket(char[] bits, ref int pos, int version, int type)
        {
            LiteralPacket packet = new LiteralPacket()
            {
                Version = version,
                Type = type
            };
            
            packet.Value = ParseLiteralValue(bits, ref pos);
            return packet;
        }

        private int ParseOperatorLength(char[] bits, ref int pos)
        {
            int operationId = bits[pos] - '0';
            pos++;

            int length = 11;

            if (operationId == 0)
            {
                length = 15;
            }

            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < length; i++)
            {
                sb.Append(bits[pos]);
                pos++;
            }

            return Convert.ToInt32(sb.ToString(), 2);
        }

        private long ParseLiteralValue (char[] bits, ref int pos)
        {
            StringBuilder sb = new StringBuilder();

            while (bits[pos] != '0')
            {
                pos++;

                for (int i = 0; i < 4; i++)
                {
                    sb.Append(bits[pos]);
                    pos++;
                }
            }

            pos++;
            for (int i = 0; i < 4; i++)
            {
                sb.Append(bits[pos]);
                pos++;
            }

            return Convert.ToInt64(sb.ToString(), 2);
        }

        private int Parse3Bits(string bits)
        {
            IDictionary<string, int> bitsToInt = new Dictionary<string, int>()
            {
                { "000", 0 },
                { "001", 1 },
                { "010", 2 },
                { "011", 3 },
                { "100", 4 },
                { "101", 5 },
                { "110", 6 },
                { "111", 7 }
            };

            return bitsToInt[bits];
        }

        private char[] TranslateFromHexToBinary(string hex)
        {
            char[] bits = new char[hex.Length * 4];

            IDictionary<char, char[]> hexToBin = new Dictionary<char, char[]>()
            {
                { '0', new char[]{ '0', '0', '0', '0' } },
                { '1', new char[]{ '0', '0', '0', '1' } },
                { '2', new char[]{ '0', '0', '1', '0' } },
                { '3', new char[]{ '0', '0', '1', '1' } },
                { '4', new char[]{ '0', '1', '0', '0' } },
                { '5', new char[]{ '0', '1', '0', '1' } },
                { '6', new char[]{ '0', '1', '1', '0' } },
                { '7', new char[]{ '0', '1', '1', '1' } },
                { '8', new char[]{ '1', '0', '0', '0' } },
                { '9', new char[]{ '1', '0', '0', '1' } },
                { 'A', new char[]{ '1', '0', '1', '0' } },
                { 'B', new char[]{ '1', '0', '1', '1' } },
                { 'C', new char[]{ '1', '1', '0', '0' } },
                { 'D', new char[]{ '1', '1', '0', '1' } },
                { 'E', new char[]{ '1', '1', '1', '0' } },
                { 'F', new char[]{ '1', '1', '1', '1' } },
            };

            int i = 0;

            foreach (char c in hex)
            {
                foreach (char b in hexToBin[c])
                {
                    bits[i] = b;
                    i++;
                }
            }

            return bits;
        }
    }
}
