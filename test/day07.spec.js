import {expect}  from 'chai';
import { Step, calculateStepOrder } from '../src/day07';

describe('Day 07', () => {
    let initialStep;
    before(() => {
        initialStep = new Step('C');
        let step1 = new Step('A');
        step1.addParent(initialStep);
        let step2 = new Step('B');
        step2.addParent(step1);
        let step3 = new Step('D');
        step3.addParent(step1);
        step1.addChild(step2);
        step1.addChild(step3);
        let step5 = new Step('F');
        step5.addParent(initialStep);
        let step4 = new Step('E');
        step4.addParent(step2);
        step4.addParent(step3);
        step4.addParent(step5);
        step2.addChild(step4);
        step3.addChild(step4);
        step5.addChild(step4);
        initialStep.addChild(step1);
        initialStep.addChild(step5);
    });

    describe ('Step', () => {
        it('should say initial step has not been executed', () => {
            expect(initialStep.hasBeenExecuted()).to.be.false;
        });
        it('should say initial step has been executed', () => {
            initialStep.execute();
            expect(initialStep.hasBeenExecuted()).to.be.true;
            initialStep.executed = false;
        });
        it('should be able to execute initial step as it has no dependencies', () => {
            expect(initialStep.canBeExecuted()).to.be.true;
        });
        it('should not be able to execute any step if the initial one is not executed', () => {
            expect(initialStep.children[0].canBeExecuted()).to.be.false;
        });
        it('should be able to execute initial step children after it is executed', () => {
            initialStep.execute();
            expect(initialStep.children[0].canBeExecuted()).to.be.true;
            initialStep.executed = false;
        });
    });
    describe('Part 1', () => {
        it('should get the correct oreder of execution of the step for the sleigh', () => {
            let expectedOrder = 'CABDFE';
            let executedSteps = calculateStepOrder([initialStep]);

            expect(executedSteps).to.equal(expectedOrder);
        });
    });
    describe('Part 2', () => {
        it('should get the area within a max distance of 32', () => {
        });
    });
});