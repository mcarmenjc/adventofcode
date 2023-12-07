package adventofcode2023.days;

import adventofcode2023.helpers.FileResourceUtils;
import adventofcode2023.models.Solution;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Day6 implements Day{
    private String inputFile = "day6.txt";

    public Solution solve(){
        FileResourceUtils utils = new FileResourceUtils();
        List<String> lines = utils.readAllLines(inputFile);

        long part1 = getPart1Solution(lines);
        long part2 = getPart2Solution(lines);

        Solution solution = new Solution();
        solution.part1 = Long.toString(part1);
        solution.part2 = Long.toString(part2);

        return solution;
    }

    private long getPart2Solution(List<String> lines){
        int time = Integer.parseInt(lines.get(0).replaceAll("\\s+", "").split(":")[1]);
        long distance = Long.parseLong(lines.get(1).replaceAll("\\s+", "").split(":")[1]);

        return getNumOfPossibleBeatingTimes(time, distance);
    }

    private long getPart1Solution(List<String> lines){
        ArrayList<Integer> times = parseLine(lines.get(0));
        ArrayList<Integer> distances = parseLine(lines.get(1));
        long num = 1;

        for (int i = 0; i < times.size(); i++){
            num *= getNumOfPossibleBeatingTimes(times.get(i), distances.get(i));
        }

        return num;
    }

    private long getNumOfPossibleBeatingTimes(int time, long distanceToBeat){
        int start = 1;
        while (start < time && getDistance((time - start), start) <= distanceToBeat){
            start++;
        }

        int end = time - 1;
        while (end > 0 && getDistance((time - end), end) <= distanceToBeat){
            end --;
        }

        return end - start + 1;
    }

    private long getDistance(long speed, long time){
        return speed*time;
    }

    private ArrayList<Integer> parseLine(String line){
        String[] values = line.split("\\s+");
        ArrayList<Integer> parsedValues = new ArrayList<>();

        for(int i = 1; i < values.length; i++){
            parsedValues.add(Integer.parseInt(values[i]));
        }

        return parsedValues;
    }

}
