import {expect}  from 'chai';
import { tryRecipesAndGetNewScores, moveElf, calculateScoresAfterTryingXRecipes } from '../src/day14';

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
        it('should be cooking 15 recipes', () => {
            let scores = calculateScoresAfterTryingXRecipes(15);
            let expectedScores = [3, 7, 1, 0, 1, 0, 1, 2, 4, 5, 1, 5, 8, 9, 1, 6, 7, 7, 9, 2];
            console.log(scores.join(', '));
            console.log(expectedScores.join(', '));
            expect(scores.length).to.equal(expectedScores.length);
            for(let i = 0; i < scores.length; i++){
                expect(scores[i]).to.equal(expectedScores[i]);
            }
        });
    });
});