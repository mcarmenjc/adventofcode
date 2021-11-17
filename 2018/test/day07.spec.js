import {expect}  from 'chai';
import { Step, calculateStepOrder, calculateTimeSpentToCompleteAllSteps, Worker } from '../src/day07';


describe('Day 07', () => {
    let initialStep;
    beforeEach(() => {
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

    describe('Worker', () => {
        it('should have no task assigned at creation', () => {
            let worker = new Worker();
            expect(worker.step).to.be.undefined;
            expect(worker.workingTime).to.equal(0);
        });
        it('should not be working when no task is assigned', () => {
            let worker = new Worker();
            expect(worker.step).to.be.undefined;
            expect(worker.isWorking()).to.be.false;
        });
        it('should have a defined task after assignation', () => {
            let worker = new Worker();
            worker.setTask(new Step('B'));
            expect(worker.step).to.not.to.be.undefined;
        });
        it('should have working time after a task is assigned', () => {
            let expectedWorkingTime = 'B'.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
            let worker = new Worker();
            worker.setTask(new Step('B'));
            worker.calculateWorkingTime(0);
            expect(worker.workingTime).to.equal(expectedWorkingTime);
        });
        it('should be working when a task is assigned', () => {
            let worker = new Worker();
            worker.setTask(new Step('B'));
            worker.calculateWorkingTime(0);
            expect(worker.isWorking()).to.be.true;
        });
        it('should decrease time when working on task', () => {
            let expectedWorkingTime = 'B'.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
            let worker = new Worker();
            worker.setTask(new Step('B'));
            worker.calculateWorkingTime(0);
            expect(worker.workingTime).to.equal(expectedWorkingTime);
            worker.work();
            expect(worker.workingTime).to.equal(expectedWorkingTime-1);
        });
        it('should has finished task when time remaining is 0', () => {
            let expectedWorkingTime = 'B'.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
            let worker = new Worker();
            worker.setTask(new Step('B'));
            worker.calculateWorkingTime(0);
            expect(worker.workingTime).to.equal(expectedWorkingTime);
            expect(worker.hasFinished()).to.be.false;
            worker.work();
            expect(worker.workingTime).to.equal(expectedWorkingTime-1);
            expect(worker.hasFinished()).to.be.false;
            worker.work();
            expect(worker.workingTime).to.equal(expectedWorkingTime-2);
            expect(worker.hasFinished()).to.be.true;
        });
        it('should has no task when he finishes', () => {
            let worker = new Worker();
            worker.setTask(new Step('B'));
            worker.calculateWorkingTime(0);
            expect(worker.step).not.to.be.undefined;
            expect(worker.workingTime).to.be.greaterThan(0);
            worker.finishTask();
            expect(worker.step).to.be.undefined;
            expect(worker.workingTime).to.equal(0);
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
        it('should execute all steps in 15s with 2 workers', () => {
            let numWorkers = 2;
            let taskTime = 0;
            let expectedTime = 15;
            let time = calculateTimeSpentToCompleteAllSteps([initialStep], numWorkers, taskTime);
            
            expect(time).to.equal(expectedTime);
        });
    });
});