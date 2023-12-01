package adventofcode2023.days;

import adventofcode2023.helpers.FileResourceUtils;

import java.util.*;

/*
--- Day 1: Trebuchet?! ---
Something is wrong with global snow production, and you've been selected to take a look. The Elves have even given you a map; on it, they've used stars to mark the top fifty locations that are likely to be having problems.

You've been doing this long enough to know that to restore snow operations, you need to check all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

You try to ask why they can't just use a weather machine ("not powerful enough") and where they're even sending you ("the sky") and why your map looks mostly blank ("you sure ask a lot of questions") and hang on did you just say the sky ("of course, where do you think snow comes from") when you realize that the Elves are already loading you into a trebuchet ("please hold still, we need to strap you in").

As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been amended by a very young Elf who was apparently just excited to show off her art skills. Consequently, the Elves are having trouble reading the values on the document.

The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

Consider your entire calibration document. What is the sum of all of the calibration values?

--- Part Two ---
Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values?
 */

public class Day1 implements Day {
    private String inputFile = "day1.txt";

    public void Solve(){
        FileResourceUtils utils = new FileResourceUtils();
        List<String>  lines = utils.readAllLines(inputFile);

        List<Integer> callibrationValuesPart1 = GetCallibrationValues(lines);
        int part1 = getSumOfCalibrationValues(callibrationValuesPart1);

        List<Integer> callibrationValuesPart2 = GetCallibrationValuesWithSpelledNumbers(lines);
        int part2 = getSumOfCalibrationValues(callibrationValuesPart2);

        System.out.println("Day 1:");
        System.out.println("\t - Part 1 => " + part1);
        System.out.println("\t - Part 2 => " + part2);
    }

    private int getSumOfCalibrationValues(List<Integer> callibrationValues){
        int sum = 0;
        for (int value : callibrationValues){
            sum += value;
        }

        return sum;
    }

    private List<Integer> GetCallibrationValuesWithSpelledNumbers(List<String> lines){
        ArrayList<Integer> callibrationValues = new ArrayList<>();

        for (String line : lines){
            int value = getCallibrationValueWithSpeeledNumnber(line);
            callibrationValues.add(value);
        }

        return callibrationValues;
    }

    private int getCallibrationValueWithSpeeledNumnber(String value){
        char[] ch = value.toCharArray();
        boolean numberFound = false;
        int it = 0;
        int callibrationValue = 0;
        HashMap<String, Integer> numbers = new HashMap<>(){
            {
                put("one", 1);
                put("two", 2);
                put("three", 3);
                put("four", 4);
                put("five", 5);
                put("six", 6);
                put("seven", 7);
                put("eight", 8);
                put("nine", 9);
            }
        };

        while (!numberFound && it < ch.length){
            if (ch[it] >= '0' && ch[it] <= '9'){
                callibrationValue = (ch[it] - '0');
                numberFound = true;
            }
            else {
                for (String number : numbers.keySet()){
                    if (ContainsNumber(ch, it, number)){
                        callibrationValue = numbers.get(number);
                        numberFound = true;
                    }
                }
            }

            it ++;
        }

        callibrationValue *= 10;

        numberFound = false;
        it = ch.length - 1;
        while (!numberFound && it >= 0){
            if (ch[it] >= '0' && ch[it] <= '9'){
                callibrationValue += (ch[it] - '0');
                numberFound = true;
            }
            else {
                for (String number : numbers.keySet()){
                    if (ContainsNumberReversed(ch, it, number)){
                        callibrationValue += numbers.get(number);
                        numberFound = true;
                    }
                }
            }

            it--;
        }

        return callibrationValue;
    }

    private boolean ContainsNumber(char[] word, int index, String number){
        for (int i = index, j = 0; i < word.length && j < number.length(); i++, j++){
            if (word[i] != number.charAt(j)){
                return false;
            }
        }

        return true;
    }

    private boolean ContainsNumberReversed(char[] word, int index, String number){
        for (int i = index, j = number.length() - 1; i >= 0 && j >= 0; i--, j--){
            if (word[i] != number.charAt(j)){
                return false;
            }
        }

        return true;
    }

    private List<Integer> GetCallibrationValues(List<String> lines){
        ArrayList<Integer> callibrationValues = new ArrayList<>();

        for (String line : lines){
            callibrationValues.add(getCallibrationValue(line));
        }

        return callibrationValues;
    }

    private int getCallibrationValue(String value){
        int callibrationValue = 0;
        char[] ch = value.toCharArray();
        int it = 0;

        while (it < ch.length && (ch[it] < '0' || ch[it] > '9')){
            it ++;
        }

        callibrationValue = (ch[it] - '0') * 10;
        it = ch.length - 1;

        while (it >= 0 && (ch[it] < '0' || ch[it] > '9')){
            it --;
        }

        callibrationValue = callibrationValue + (ch[it] - '0');
        return callibrationValue;
    }
}
