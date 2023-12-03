package adventofcode2023.days;

import adventofcode2023.helpers.FileResourceUtils;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class Day3  implements Day{
    private String inputFile = "day3.txt";

    public void Solve() {
        FileResourceUtils utils = new FileResourceUtils();
        List<String> lines = utils.readAllLines(inputFile);

        long part1 = GetSumOfAllPartNumbers(lines);
        long part2 = GetSumOfAllGearRatios(lines);

        System.out.println("Day 3:");
        System.out.println("\t - Part 1 => " + part1);
        System.out.println("\t - Part 2 => " + part2);
    }

    private long GetSumOfAllGearRatios(List<String> lines){
        long sum = 0;

        for (int i = 0; i < lines.size(); i++) {
            for (int j = 0; j < lines.get(i).length(); j++) {
                char c = lines.get(i).charAt(j);

                if (c == '*') {
                    ArrayList<Integer> partialNumbers = GetPartialNumbersAroundGear(lines, i, j);

                    if (partialNumbers.size() == 2){
                        sum += (partialNumbers.get(0) * partialNumbers.get(1));
                    }
                }
            }
        }

        return sum;
    }

    private ArrayList<Integer> GetPartialNumbersAroundGear(List<String> lines, int i, int j){
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
                    int partialNum = GetPartialNumber(lines.get(neighbour.get(0)), neighbour.get(1));

                    if (!partialNumbers.contains(partialNum)){
                        partialNumbers.add(partialNum);
                    }
                }
            }
        }

        return partialNumbers;
    }

    private long GetSumOfAllPartNumbers(List<String> lines){
        long sum = 0;

        for (int i = 0; i < lines.size(); i++){
            for (int j = 0; j < lines.get(i).length(); j++){
                char c = lines.get(i).charAt(j);

                if (c >= '0' && c <= '9' && IsPartialNumber(lines, i, j)){
                    int number = GetPartialNumber(lines.get(i), j);
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

    private int GetPartialNumber(String line, int pos){
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

    private boolean IsPartialNumber(List<String> lines, int i, int j){
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
