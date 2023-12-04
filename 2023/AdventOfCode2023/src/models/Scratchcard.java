package adventofcode2023.models;

import java.util.ArrayList;
import java.util.HashSet;

public class Scratchcard {
    public HashSet<Integer> luckyNumbers = new HashSet<>();
    public ArrayList<Integer> playingNumbers = new ArrayList<>();

    public int getPoints(){
        int points = 0;

        for (int num : playingNumbers){
            if (luckyNumbers.contains(num)){
                if (points == 0){
                    points = 1;
                }
                else {
                    points *= 2;
                }
            }
        }

        return points;
    }

    public int getAmountOfWinningNumbers(){
        int count = 0;

        for (int num : playingNumbers){
            if (luckyNumbers.contains(num)){
                count ++;
            }
        }

        return count;
    }
}
