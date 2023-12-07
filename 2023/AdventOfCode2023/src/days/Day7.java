package adventofcode2023.days;

import adventofcode2023.helpers.FileResourceUtils;
import adventofcode2023.models.Solution;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class Day7 implements Day{
    private String inputFile = "day7.txt";
    private HashMap<Character, Integer> cards = new HashMap<>(){{
        put('A', 13);
        put('K', 12);
        put('Q', 11);
        put('J', 10);
        put('T', 9);
        put('9', 8);
        put('8', 7);
        put('7', 6);
        put('6', 5);
        put('5', 4);
        put('4', 3);
        put('3', 2);
        put('2', 1);
    }};
    private HashMap<Character, Integer> cardsWithJoker = new HashMap<>(){{
        put('A', 13);
        put('K', 12);
        put('Q', 11);
        put('T', 10);
        put('9', 9);
        put('8', 8);
        put('7', 7);
        put('6', 6);
        put('5', 5);
        put('4', 4);
        put('3', 3);
        put('2', 2);
        put('J', 1);
    }};

    public Solution solve(){
        HashMap<String, Integer> hands = parseHands();

        long part1 = getTotalWinnings(hands, false);
        long part2 = getTotalWinnings(hands, true);

        Solution solution = new Solution();
        solution.part1 = Long.toString(part1);
        solution.part2 = Long.toString(part2);

        return solution;
    }

    private HashMap<String, Integer> parseHands(){
        FileResourceUtils utils = new FileResourceUtils();
        List<String> lines = utils.readAllLines(inputFile);
        HashMap<String, Integer> hands = new HashMap<>();

        for(String line : lines){
            String[] parts = line.split("\\s+");
            hands.put(parts[0], Integer.parseInt(parts[1]));
        }

        return hands;
    }

    private long getTotalWinnings(HashMap<String, Integer> hands, boolean useJoker){
        long winnings = 0;
        HashMap<String, ArrayList<String>> handsPerType = categorizeHand(hands, useJoker);

        for(String type : handsPerType.keySet()) {
            handsPerType.get(type).sort((x, y) -> compareHands(x, y, useJoker ? cardsWithJoker : cards));
        }

        ArrayList<String> sortedTypes = new ArrayList<>(Arrays.asList("five", "four", "full", "three", "two", "one", "high"));
        int rank = hands.size();

        for (String type : sortedTypes){
            if (handsPerType.containsKey(type)){
                for (String hand : handsPerType.get(type)){
                    winnings += rank * hands.get(hand);
                    rank --;
                }
            }
        }

        return winnings;
    }

    private int compareHands(String hand1, String hand2, HashMap<Character, Integer> cards){
        char[] ch1 = hand1.toCharArray();
        char[] ch2 = hand2.toCharArray();

        for (int i = 0; i < ch1.length; i++){
            if (cards.get(ch1[i]) < cards.get(ch2[i])){
                return 1;
            }
            else {
                if (cards.get(ch1[i]) > cards.get(ch2[i])){
                    return -1;
                }
            }
        }

        return 0;
    }

    private HashMap<String, ArrayList<String>> categorizeHand(HashMap<String, Integer> hands, boolean useJoker){
        HashMap<String, ArrayList<String>> handsPerType = new HashMap<>();

        for (String hand : hands.keySet()){
            String type = getType(hand, useJoker);

            if (!handsPerType.containsKey(type)){
                handsPerType.put(type, new ArrayList<>());
            }

            handsPerType.get(type).add(hand);
        }

        return handsPerType;
    }

    private String getType(String hand, boolean useJoker){
        HashMap<Character, Integer> cardsCount = new HashMap<>();
        char[] ch = hand.toCharArray();

        for (char c : ch){
            if (!cardsCount.containsKey(c)){
                cardsCount.put(c, 0);
            }

            cardsCount.put(c, cardsCount.get(c) + 1);
        }

        if (useJoker && cardsCount.containsKey('J')){
            if (cardsCount.get('J') < 5){
                int maxCount = -1;
                char card = '0';

                for (char c : cardsCount.keySet()){
                    if (c != 'J' && cardsCount.get(c) > maxCount){
                        maxCount = cardsCount.get(c);
                        card = c;
                    }
                }

                cardsCount.put(card, cardsCount.get(card) + cardsCount.get('J'));
                cardsCount.remove('J');
            }
        }

        int numDifferentCards = cardsCount.keySet().size();
        switch (numDifferentCards){
            case 5:
                return "high";
            case 4:
                return "one";
            case 1:
                return "five";
            case 3:
                for (int v : cardsCount.values()){
                    if (v == 3){
                        return "three";
                    }
                }

                return "two";
            case 2:
                for (int v : cardsCount.values()){
                    if (v == 3){
                        return "full";
                    }
                }

                return "four";
            default:
                return null;
        }
    }
}
