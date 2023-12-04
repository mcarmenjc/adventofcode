package adventofcode2023;

import adventofcode2023.days.*;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);

        System.out.println("Please choose an option:");
        System.out.println("\t - Run all days (A)");
        System.out.println("\t - Run specific day (S)");
        System.out.println("Default is A: ");

        String s = in.nextLine();

        if (s.equals("S")){
            System.out.println("Please select a day from 1 to 24: ");
            int dayNum = in.nextInt();

            if (dayNum > 24){
                System.err.println("Day out of range. Please select from 1 to 24.");
                return;
            }

            Day day = GetDay(dayNum);

            if (day != null){
                day.solve();
            }
        }
        else{
            for (int i = 1; i < 24; i++){
                Day day = GetDay(i);

                if (day != null){
                    day.solve();
                }
            }
        }
    }

    private static Day GetDay(int num){
        switch(num){
            case 1:
                return new Day1();
            case 2:
                return new Day2();
            case 3:
                return new Day3();
            case 4:
                return new Day4();
            default:
                return null;
        }
    }
}