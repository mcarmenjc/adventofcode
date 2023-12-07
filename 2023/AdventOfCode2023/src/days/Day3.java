package adventofcode2023.days;

import adventofcode2023.helpers.FileResourceUtils;
import adventofcode2023.models.Solution;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
/*
--- Day 3: Gear Ratios ---
You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, but this is as far as he can bring you. You go inside.

It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

"Aaah!"

You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.

The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.

The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

Here is an example engine schematic:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?

Your puzzle answer was 550064.

--- Part Two ---
The engineer finds the missing part and installs it in the engine! As the engine springs to life, you jump in the closest gondola, finally ready to ascend to the water source.

You don't seem to be going very fast, though. Maybe something is still wrong? Fortunately, the gondola has a phone labeled "help", so you pick it up and the engineer answers.

Before you can explain the situation, she suggests that you look out the window. There stands the engineer, holding a phone in one hand and waving with the other. You're going so slowly that you haven't even left the station. You exit the gondola.

The missing part wasn't the only issue - one of the gears in the engine is wrong. A gear is any * symbol that is adjacent to exactly two part numbers. Its gear ratio is the result of multiplying those two numbers together.

This time, you need to find the gear ratio of every gear and add them all up so that the engineer can figure out which gear needs to be replaced.

Consider the same engine schematic again:

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
In this schematic, there are two gears. The first is in the top left; it has part numbers 467 and 35, so its gear ratio is 16345. The second gear is in the lower right; its gear ratio is 451490. (The * adjacent to 617 is not a gear because it is only adjacent to one part number.) Adding up all of the gear ratios produces 467835.

What is the sum of all of the gear ratios in your engine schematic?

Your puzzle answer was 85010461.
 */
public class Day3  implements Day{
    private String inputFile = "day3.txt";

    public Solution solve() {
        FileResourceUtils utils = new FileResourceUtils();
        List<String> lines = utils.readAllLines(inputFile);

        long part1 = getSumOfAllPartNumbers(lines);
        long part2 = getSumOfAllGearRatios(lines);

        Solution solution = new Solution();
        solution.part1 = Long.toString(part1);
        solution.part2 = Long.toString(part2);

        return solution;
    }

    private long getSumOfAllGearRatios(List<String> lines){
        long sum = 0;

        for (int i = 0; i < lines.size(); i++) {
            for (int j = 0; j < lines.get(i).length(); j++) {
                char c = lines.get(i).charAt(j);

                if (c == '*') {
                    ArrayList<Integer> partialNumbers = getPartialNumbersAroundGear(lines, i, j);

                    if (partialNumbers.size() == 2){
                        sum += (partialNumbers.get(0) * partialNumbers.get(1));
                    }
                }
            }
        }

        return sum;
    }

    private ArrayList<Integer> getPartialNumbersAroundGear(List<String> lines, int i, int j){
        ArrayList<Integer> partialNumbers = new ArrayList<>();
        ArrayList<ArrayList<Integer>> moves = new ArrayList<>();
        moves.add(new ArrayList<>(Arrays.asList(1, 0)));
        moves.add(new ArrayList<>(Arrays.asList(1, 1)));
        moves.add(new ArrayList<>(Arrays.asList(0, 1)));
        moves.add(new ArrayList<>(Arrays.asList(-1, 0)));
        moves.add(new ArrayList<>(Arrays.asList(1, -1)));
        moves.add(new ArrayList<>(Arrays.asList(-1, 1)));
        moves.add(new ArrayList<>(Arrays.asList(0, -1)));
        moves.add(new ArrayList<>(Arrays.asList(-1, -1)));

        for (var move : moves){
            ArrayList<Integer> neighbour = new ArrayList<>(Arrays.asList(i+move.get(0), j+move.get(1)));

            if (neighbour.get(0) >= 0 && neighbour.get(0) < lines.size() &&
                neighbour.get(1) >= 0 && neighbour.get(1) < lines.get(i).length()){
                char c = lines.get(neighbour.get(0)).charAt(neighbour.get(1));

                if (c >= '0' && c <= '9'){
                    int partialNum = getPartialNumber(lines.get(neighbour.get(0)), neighbour.get(1));

                    if (!partialNumbers.contains(partialNum)){
                        partialNumbers.add(partialNum);
                    }
                }
            }
        }

        return partialNumbers;
    }

    private long getSumOfAllPartNumbers(List<String> lines){
        long sum = 0;

        for (int i = 0; i < lines.size(); i++){
            for (int j = 0; j < lines.get(i).length(); j++){
                char c = lines.get(i).charAt(j);

                if (c >= '0' && c <= '9' && isPartialNumber(lines, i, j)){
                    int number = getPartialNumber(lines.get(i), j);
                    sum += number;

                    while (j < lines.get(i).length() && lines.get(i).charAt(j) >= '0' &&
                            lines.get(i).charAt(j) <= '9'){
                        j ++;
                    }
                    j --;
                }

            }
        }

        return sum;
    }

    private int getPartialNumber(String line, int pos){
        int start = pos;
        int end = pos;

        while(start >= 0 && line.charAt(start) >= '0' && line.charAt(start) <= '9'){
            start --;
        }
        start ++;

        while(end < line.length() && line.charAt(end) >= '0' && line.charAt(end) <= '9'){
            end ++;
        }

        String number = line.substring(start, end);
        return Integer.parseInt(number);
    }

    private boolean isPartialNumber(List<String> lines, int i, int j){
        ArrayList<ArrayList<Integer>> moves = new ArrayList<>();
        moves.add(new ArrayList<>(Arrays.asList(1, 0)));
        moves.add(new ArrayList<>(Arrays.asList(1, 1)));
        moves.add(new ArrayList<>(Arrays.asList(0, 1)));
        moves.add(new ArrayList<>(Arrays.asList(-1, 0)));
        moves.add(new ArrayList<>(Arrays.asList(1, -1)));
        moves.add(new ArrayList<>(Arrays.asList(-1, 1)));
        moves.add(new ArrayList<>(Arrays.asList(0, -1)));
        moves.add(new ArrayList<>(Arrays.asList(-1, -1)));

        for (var move : moves){
            ArrayList<Integer> neighbour = new ArrayList<>(Arrays.asList(
                    i + move.get(0), j + move.get(1)));
            if (neighbour.get(0) >= 0 && neighbour.get(0) < lines.size() &&
                    neighbour.get(1) >= 0 && neighbour.get(1) < lines.get(i).length()){
                char c = lines.get(neighbour.get(0)).charAt(neighbour.get(1));
                if (c != '.' && (c < '0' || c > '9')){
                    return true;
                }
            }
        }

        return false;
    }
}
