package adventofcode2023.days;

import adventofcode2023.helpers.FileResourceUtils;
import adventofcode2023.models.Seed;
import adventofcode2023.models.Solution;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

/*
--- Day 5: If You Give A Seed A Fertilizer ---
You take the boat and find the gardener right where you were told he would be: managing a giant "garden" that looks more to you like a farm.

"A water source? Island Island is the water source!" You point out that Snow Island isn't receiving any water.

"Oh, we had to stop the water because we ran out of sand to filter it with! Can't make snow with dirty water. Don't worry, I'm sure we'll get more sand soon; we only turned off the water a few days... weeks... oh no." His face sinks into a look of horrified realization.

"I've been so busy making sure everyone here has food that I completely forgot to check why we stopped getting more sand! There's a ferry leaving soon that is headed over in that direction - it's much faster than your boat. Could you please go check it out?"

You barely have time to agree to this request when he brings up another. "While you wait for the ferry, maybe you can help us with our food production problem. The latest Island Island Almanac just arrived and we're having trouble making sense of it."

The almanac (your puzzle input) lists all of the seeds that need to be planted. It also lists what type of soil to use with each kind of seed, what type of fertilizer to use with each kind of soil, what type of water to use with each kind of fertilizer, and so on. Every type of seed, soil, fertilizer and so on is identified with a number, but numbers are reused by each category - that is, soil 123 and fertilizer 123 aren't necessarily related to each other.

For example:

seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
The almanac starts by listing which seeds need to be planted: seeds 79, 14, 55, and 13.

The rest of the almanac contains a list of maps which describe how to convert numbers from a source category into numbers in a destination category. That is, the section that starts with seed-to-soil map: describes how to convert a seed number (the source) to a soil number (the destination). This lets the gardener and his team know which soil to use with which seeds, which water to use with which fertilizer, and so on.

Rather than list every source number and its corresponding destination number one by one, the maps describe entire ranges of numbers that can be converted. Each line within a map contains three numbers: the destination range start, the source range start, and the range length.

Consider again the example seed-to-soil map:

50 98 2
52 50 48
The first line has a destination range start of 50, a source range start of 98, and a range length of 2. This line means that the source range starts at 98 and contains two values: 98 and 99. The destination range is the same length, but it starts at 50, so its two values are 50 and 51. With this information, you know that seed number 98 corresponds to soil number 50 and that seed number 99 corresponds to soil number 51.

The second line means that the source range starts at 50 and contains 48 values: 50, 51, ..., 96, 97. This corresponds to a destination range starting at 52 and also containing 48 values: 52, 53, ..., 98, 99. So, seed number 53 corresponds to soil number 55.

Any source numbers that aren't mapped correspond to the same destination number. So, seed number 10 corresponds to soil number 10.

So, the entire list of seed numbers and their corresponding soil numbers looks like this:

seed  soil
0     0
1     1
...   ...
48    48
49    49
50    52
51    53
...   ...
96    98
97    99
98    50
99    51
With this map, you can look up the soil number required for each initial seed number:

Seed number 79 corresponds to soil number 81.
Seed number 14 corresponds to soil number 14.
Seed number 55 corresponds to soil number 57.
Seed number 13 corresponds to soil number 13.
The gardener and his team want to get started as soon as possible, so they'd like to know the closest location that needs a seed. Using these maps, find the lowest location number that corresponds to any of the initial seeds. To do this, you'll need to convert each seed number through other categories until you can find its corresponding location number. In this example, the corresponding types are:

Seed 79, soil 81, fertilizer 81, water 81, light 74, temperature 78, humidity 78, location 82.
Seed 14, soil 14, fertilizer 53, water 49, light 42, temperature 42, humidity 43, location 43.
Seed 55, soil 57, fertilizer 57, water 53, light 46, temperature 82, humidity 82, location 86.
Seed 13, soil 13, fertilizer 52, water 41, light 34, temperature 34, humidity 35, location 35.
So, the lowest location number in this example is 35.

What is the lowest location number that corresponds to any of the initial seed numbers?

Your puzzle answer was 318728750.

--- Part Two ---
Everyone will starve if you only plant such a small number of seeds. Re-reading the almanac, it looks like the seeds: line actually describes ranges of seed numbers.

The values on the initial seeds: line come in pairs. Within each pair, the first value is the start of the range and the second value is the length of the range. So, in the first line of the example above:

seeds: 79 14 55 13
This line describes two ranges of seed numbers to be planted in the garden. The first range starts with seed number 79 and contains 14 values: 79, 80, ..., 91, 92. The second range starts with seed number 55 and contains 13 values: 55, 56, ..., 66, 67.

Now, rather than considering four seed numbers, you need to consider a total of 27 seed numbers.

In the above example, the lowest location number can be obtained from seed number 82, which corresponds to soil 84, fertilizer 84, water 84, light 77, temperature 45, humidity 46, and location 46. So, the lowest location number is 46.

Consider all of the initial seed numbers listed in the ranges on the first line of the almanac. What is the lowest location number that corresponds to any of the initial seed numbers?

Your puzzle answer was 37384986.

Both parts of this puzzle are complete! They provide two gold stars: **
 */

public class Day5 implements Day{
    private String inputFile = "day5.txt";

    public Solution solve(){
        FileResourceUtils utils = new FileResourceUtils();
        List<String> lines = utils.readAllLines(inputFile);

        ArrayList<Seed> seeds = parseSeeds(lines);
        List<Long> minLocationsSeeds = seeds.stream().map(x -> x.locationId).toList();
        long part1 = getSeedWithLowestLocation(minLocationsSeeds);

        ArrayList<ArrayList<Long>> locationRanges = getLocationRanges(lines);
        List<Long> minLocations = locationRanges.stream().map(x -> x.get(0)).toList();
        long part2 = getSeedWithLowestLocation(minLocations);

        Solution solution = new Solution();
        solution.part1 = Long.toString(part1);
        solution.part2 = Long.toString(part2);

        return solution;
    }

    private ArrayList<ArrayList<Long>> getLocationRanges(List<String> lines){
        ArrayList<ArrayList<Long>> ranges = new ArrayList<>();

        String[] seedsIds = lines.get(0).split(": ")[1].split(" ");

        for(int i = 0; i < seedsIds.length; i += 2){
            ranges.add(new ArrayList<>(Arrays.asList(Long.parseLong(seedsIds[i]), Long.parseLong(seedsIds[i+1]))));
        }

        ArrayList<ArrayList<ArrayList<Long>>> conversions = parseMappingConversions(lines);

        for (var map : conversions){
            ArrayList<ArrayList<Long>> newRanges = new ArrayList<>();
            ranges.sort((x, y) -> x.get(0) < y.get(0) ? -1 : (x.get(0) > y.get(0) ? 1 : 0));

            int i = 0;
            while (i < ranges.size()){
                ArrayList<Long> convertedRange = convertRange(map, ranges, i);

                if (convertedRange.isEmpty()){
                    newRanges.add(ranges.get(i));
                }
                else{
                    newRanges.add(convertedRange);
                }

                i++;
            }

            ranges = newRanges;
        }

        return ranges;
    }

    private ArrayList<Long> convertRange(ArrayList<ArrayList<Long>> mappings, ArrayList<ArrayList<Long>> ranges, int i){
        ArrayList<Long> newRange = new ArrayList<>();

        long rangeStart = ranges.get(i).get(0);
        long rangeEnd = ranges.get(i).get(0) + ranges.get(i).get(1) - 1;

        for (var conversion : mappings){
            long conversionStart = conversion.get(1);
            long conversionEnd = conversion.get(1) + conversion.get(2) - 1;

            if (rangeStart >= conversionStart && rangeStart <= conversionEnd){
                long offset = rangeStart - conversionStart;
                long start = conversion.get(0) + offset;

                if (rangeEnd <= conversionEnd){
                    newRange.add(start);
                    newRange.add(ranges.get(i).get(1));
                }
                else {
                    newRange.add(start);
                    long length = conversionEnd - rangeStart + 1;
                    newRange.add(length);
                    long partStart = conversionEnd + 1;
                    length = rangeEnd - conversionEnd;
                    ranges.add(new ArrayList<>(Arrays.asList(partStart, length)));
                }

                return newRange;
            }
            else if (rangeEnd >= conversionStart && rangeEnd <= conversionEnd){
                long length = rangeEnd - conversionStart + 1;
                long start = conversion.get(0);

                newRange.add(start);
                newRange.add(length);
                length = ranges.get(i).get(1) - length;
                ranges.add(new ArrayList<>(Arrays.asList(rangeStart, length)));

                return newRange;
            }
        }

        return newRange;
    }

    private long getSeedWithLowestLocation(List<Long> seeds){
        long lowerLocation = Long.MAX_VALUE;

        for(long seed : seeds){
            if (seed < lowerLocation){
                lowerLocation = seed;
            }
        }

        return lowerLocation;
    }

    private ArrayList<Seed> parseSeeds(List<String> lines){
        ArrayList<Seed> seeds = new ArrayList<>();

        String[] seedsIds = lines.get(0).split(": ")[1].split(" ");

        for(String seedId : seedsIds){
            Seed seed = new Seed();
            seed.id = Long.parseLong(seedId);
            seeds.add(seed);
        }

        ArrayList<ArrayList<ArrayList<Long>>> conversions = parseMappingConversions(lines);

        for (Seed seed : seeds){
            seed.soilId = getValueFromConversionMap(conversions.get(0), seed.id);
            seed.fertilizerId = getValueFromConversionMap(conversions.get(1), seed.soilId);
            seed.waterId = getValueFromConversionMap(conversions.get(2), seed.fertilizerId);
            seed.lightId = getValueFromConversionMap(conversions.get(3), seed.waterId);
            seed.temperatureId = getValueFromConversionMap(conversions.get(4), seed.lightId);
            seed.humidityId = getValueFromConversionMap(conversions.get(5), seed.temperatureId);
            seed.locationId = getValueFromConversionMap(conversions.get(6), seed.humidityId);
        }

        return seeds;
    }

    private static ArrayList<ArrayList<ArrayList<Long>>> parseMappingConversions(List<String> lines) {
        int i = 2;
        ArrayList<ArrayList<ArrayList<Long>>> conversions = new ArrayList<>();

        while (i < lines.size()){
            ArrayList<ArrayList<Long>> range = new ArrayList<>();
            String category = lines.get(i).split(" ")[0];
            i++;
            while (i < lines.size() && !lines.get(i).isEmpty()){
                String[] rangeInfo = lines.get(i).split(" ");
                ArrayList<Long> ranges = new ArrayList<>();

                for(String v : rangeInfo){
                    ranges.add(Long.parseLong(v));
                }

                range.add(ranges);
                i++;
            }

            range.sort((x, y) -> x.get(1) < y.get(1) ? -1 : (x.get(1) > y.get(1) ? 1 : 0));
            conversions.add(range);
            i ++;
        }
        return conversions;
    }

    private long getValueFromConversionMap(ArrayList<ArrayList<Long>> conversion, long value){
        int i = 0;
        long newValue = value;

        while (i < conversion.size()){
            if (value >= conversion.get(i).get(1) && value < (conversion.get(i).get(1) + conversion.get(i).get(2))){
                newValue = (value - conversion.get(i).get(1)) + conversion.get(i).get(0);
            }
            i++;
        }

        return newValue;
    }
}
