package adventofcode2023;

import adventofcode2023.days.*;
import adventofcode2023.models.Solution;

public class Main {
    public static void main(String[] args) {
        if (args.length > 0){
            if (args[0].equals("-all")){
                runAll();
                return;
            }

            if (args[0].equals("-day")){
                if (args.length > 1){
                    try {
                        int dayNum = Integer.parseInt(args[1]);
                        if (dayNum >= 1 && dayNum <= 24){
                            Day day = getDay(dayNum);

                            if (day != null){
                                Solution solution = day.solve();
                                printSolution(dayNum, solution);
                                return;
                            }
                        }
                    }
                    catch (Exception e){
                    }
                }
            }
        }

        System.err.println("These are the valid arguments:");
        System.err.println("\t -all (to run all cases)");
        System.err.println("\t -day <day number from 1 to 24> (to run a specific day)");
    }

    private static void runAll(){
        for (int i = 1; i < 24; i++){
            Day day = getDay(i);

            if (day != null){
                Solution solution = day.solve();
                printSolution(i, solution);
            }
        }
    }

    private static void printSolution(int dayNum, Solution solution){
        System.out.println("Day " + dayNum + ":");
        System.out.println("\t - Part 1 => " + solution.part1);
        System.out.println("\t - Part 2 => " + solution.part2);
    }

    private static Day getDay(int num){
        switch(num){
            case 1:
                return new Day1();
            case 2:
                return new Day2();
            case 3:
                return new Day3();
            case 4:
                return new Day4();
            case 5:
                return new Day5();
            case 6:
                return new Day6();
            case 7:
                return new Day7();
            case 8:
                return new Day8();
            default:
                return null;
        }
    }
}