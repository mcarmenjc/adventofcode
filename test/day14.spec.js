import {expect}  from 'chai';
import { tryRecipesAndGetNewScores, moveElf, calculateScoresAfterTryingXRecipes, getScoresOfRecipesTriedAfter, calculateNumRecipesToTryBeforeGettingScores } from '../src/day14';

describe('Day 14', () => {
    describe('Elves', () => {
        it('should try current recipes and if they score 10 add 1 0 to the score list', () => {
            let elves = [0, 1];
            let recipesScores = [3, 7];
            let scores = tryRecipesAndGetNewScores(elves, recipesScores);
            let expectedScores = [1, 0];
            expect(scores.length).to.equal(expectedScores.length);
            for (let i = 0; i < scores.length; i++){
                expect(scores[i]).to.equal(expectedScores[i]);
            }
        });
        it('should move depending on the current recipe position and score', () => {
            let elves = [0, 1];
            let recipesScores = [3, 7, 1, 0];
            let nextRecipeForElf1 = moveElf(elves[0], recipesScores[elves[0]], recipesScores.length);
            let nextRecipeForElf2 = moveElf(elves[1], recipesScores[elves[1]], recipesScores.length);
            let expectedRecipeForElf1 = 0;
            let expectedRecipeForElf2 = 1;

            expect(nextRecipeForElf1).to.equal(expectedRecipeForElf1);
            expect(nextRecipeForElf2).to.equal(expectedRecipeForElf2);
        });
        it('should be cooking until 20 recipes are made', () => {
            let numRecipes = 20;
            let scores = calculateScoresAfterTryingXRecipes(numRecipes);
            let expectedScores = [3, 7, 1, 0, 1, 0, 1, 2, 4, 5, 1, 5, 8, 9, 1, 6, 7, 7, 9, 2];
            expect(scores.length).to.equal(expectedScores.length);
            for(let i = 0; i < scores.length; i++){
                expect(scores[i]).to.equal(expectedScores[i]);
            }
        });
    });
    describe('Part 1', () => {
        it('should get 5158916779 as the 10 extra scores after making 9 recipes', () => {
            let numRecipes = 9;
            let numExtraScores = 10;
            let last10 = getScoresOfRecipesTriedAfter(numRecipes, numExtraScores);
            let expectedLast10 = '5158916779';
            expect(last10).to.equal(expectedLast10);
        });
        it('should get 0124515891 as the 10 extra scores after making 5 recipes', () => {
            let numRecipes = 5;
            let numExtraScores = 10;
            let last10 = getScoresOfRecipesTriedAfter(numRecipes, numExtraScores);
            let expectedLast10 = '0124515891';
            expect(last10).to.equal(expectedLast10);
        });
        it('should get 9251071085 as the 10 extra scores after making 18 recipes', () => {
            let numRecipes = 18;
            let numExtraScores = 10;
            let last10 = getScoresOfRecipesTriedAfter(numRecipes, numExtraScores);
            let expectedLast10 = '9251071085';
            expect(last10).to.equal(expectedLast10);
        });
        it('should get 5941429882 as the 10 extra scores after making 2018 recipes', () => {
            let numRecipes = 2018;
            let numExtraScores = 10;
            let last10 = getScoresOfRecipesTriedAfter(numRecipes, numExtraScores);
            let expectedLast10 = '5941429882';
            expect(last10).to.equal(expectedLast10);
        });
    });
    describe('Part 2', () => {
        it('should get 9 as the number of recipes scores until finding 51589', () => {
            let expectedNumRecipes = 9;
            let scores = '51589';
            let numRecipes = calculateNumRecipesToTryBeforeGettingScores(scores);
            expect(numRecipes).to.equal(expectedNumRecipes);
        });
        it('should get 5 as the number of recipes scores until finding 01245', () => {
            let expectedNumRecipes = 5;
            let scores = '01245';
            let numRecipes = calculateNumRecipesToTryBeforeGettingScores(scores);
            expect(numRecipes).to.equal(expectedNumRecipes);
        });
        it('should get 18 as the number of recipes scores until finding 92510', () => {
            let expectedNumRecipes = 18;
            let scores = '92510';
            let numRecipes = calculateNumRecipesToTryBeforeGettingScores(scores);
            expect(numRecipes).to.equal(expectedNumRecipes);
        });
        it('should get 2018 as the number of recipes scores until finding 59414', () => {
            let expectedNumRecipes = 2018;
            let scores = '59414';
            let numRecipes = calculateNumRecipesToTryBeforeGettingScores(scores);
            expect(numRecipes).to.equal(expectedNumRecipes);
        });
    });
});