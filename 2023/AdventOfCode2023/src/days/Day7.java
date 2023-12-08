package adventofcode2023.days;

import adventofcode2023.helpers.FileResourceUtils;
import adventofcode2023.models.Solution;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

/*
--- Day 7: Camel Cards ---
Your all-expenses-paid trip turns out to be a one-way, five-minute ride in an airship. (At least it's a cool airship!) It drops you off at the edge of a vast desert and descends back to Island Island.

"Did you bring the parts?"

You turn around to see an Elf completely covered in white clothing, wearing goggles, and riding a large camel.

"Did you bring the parts?" she asks again, louder this time. You aren't sure what parts she's looking for; you're here to figure out why the sand stopped.

"The parts! For the sand, yes! Come with me; I will show you." She beckons you onto the camel.

After riding a bit across the sands of Desert Island, you can see what look like very large rocks covering half of the horizon. The Elf explains that the rocks are all along the part of Desert Island that is directly above Island Island, making it hard to even get there. Normally, they use big machines to move the rocks and filter the sand, but the machines have broken down because Desert Island recently stopped receiving the parts they need to fix the machines.

You've already assumed it'll be your job to figure out why the parts stopped when she asks if you can help. You agree automatically.

Because the journey will take a few days, she offers to teach you the game of Camel Cards. Camel Cards is sort of similar to poker except it's designed to be easier to play while riding a camel.

In Camel Cards, you get a list of hands, and your goal is to order them based on the strength of each hand. A hand consists of five cards labeled one of A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2. The relative strength of each card follows this order, where A is the highest and 2 is the lowest.

Every hand is exactly one type. From strongest to weakest, they are:

Five of a kind, where all five cards have the same label: AAAAA
Four of a kind, where four cards have the same label and one card has a different label: AA8AA
Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
High card, where all cards' labels are distinct: 23456
Hands are primarily ordered based on type; for example, every full house is stronger than any three of a kind.

If two hands have the same type, a second ordering rule takes effect. Start by comparing the first card in each hand. If these cards are different, the hand with the stronger first card is considered stronger. If the first card in each hand have the same label, however, then move on to considering the second card in each hand. If they differ, the hand with the higher second card wins; otherwise, continue with the third card in each hand, then the fourth, then the fifth.

So, 33332 and 2AAAA are both four of a kind hands, but 33332 is stronger because its first card is stronger. Similarly, 77888 and 77788 are both a full house, but 77888 is stronger because its third card is stronger (and both hands have the same first and second card).

To play Camel Cards, you are given a list of hands and their corresponding bid (your puzzle input). For example:

32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
This example shows five hands; each hand is followed by its bid amount. Each hand wins an amount equal to its bid multiplied by its rank, where the weakest hand gets rank 1, the second-weakest hand gets rank 2, and so on up to the strongest hand. Because there are five hands in this example, the strongest hand will have rank 5 and its bid will be multiplied by 5.

So, the first step is to put the hands in order of strength:

32T3K is the only one pair and the other hands are all a stronger type, so it gets rank 1.
KK677 and KTJJT are both two pair. Their first cards both have the same label, but the second card of KK677 is stronger (K vs T), so KTJJT gets rank 2 and KK677 gets rank 3.
T55J5 and QQQJA are both three of a kind. QQQJA has a stronger first card, so it gets rank 5 and T55J5 gets rank 4.
Now, you can determine the total winnings of this set of hands by adding up the result of multiplying each hand's bid with its rank (765 * 1 + 220 * 2 + 28 * 3 + 684 * 4 + 483 * 5). So the total winnings in this example are 6440.

Find the rank of every hand in your set. What are the total winnings?

Your puzzle answer was 248113761.

--- Part Two ---
To make things a little more interesting, the Elf introduces one additional rule. Now, J cards are jokers - wildcards that can act like whatever card would make the hand the strongest type possible.

To balance this, J cards are now the weakest individual cards, weaker even than 2. The other cards stay in the same order: A, K, Q, T, 9, 8, 7, 6, 5, 4, 3, 2, J.

J cards can pretend to be whatever card is best for the purpose of determining hand type; for example, QJJQ2 is now considered four of a kind. However, for the purpose of breaking ties between two hands of the same type, J is always treated as J, not the card it's pretending to be: JKKK2 is weaker than QQQQ2 because J is weaker than Q.

Now, the above example goes very differently:

32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
32T3K is still the only one pair; it doesn't contain any jokers, so its strength doesn't increase.
KK677 is now the only two pair, making it the second-weakest hand.
T55J5, KTJJT, and QQQJA are now all four of a kind! T55J5 gets rank 3, QQQJA gets rank 4, and KTJJT gets rank 5.
With the new joker rule, the total winnings in this example are 5905.

Using the new joker rule, find the rank of every hand in your set. What are the new total winnings?

Your puzzle answer was 246285222.
 */

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
