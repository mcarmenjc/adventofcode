import {expect}  from 'chai';
import { generateTree, addMetadataForAllNodes, calculateNodeValue } from '../src/day08';

describe('Day 08', () => {
    let rootNode;
    before(() => {
        let input = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];
        rootNode = generateTree(input); 
    });

    describe ('Tree', () => {
        it('should be generated using info array', () => {
            let infoArray = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];
            expect(rootNode).not.to.be.undefined;
            expect(rootNode.numChildren).to.equal(infoArray[0]);
            expect(rootNode.numMetadata).to.equal(infoArray[1]);
            expect(rootNode.metadata[0]).to.equal(infoArray[13]);
            expect(rootNode.metadata[1]).to.equal(infoArray[14]);
            expect(rootNode.metadata[2]).to.equal(infoArray[15]);
            expect(rootNode.children[0].numChildren).to.equal(infoArray[2]);
            expect(rootNode.children[0].numMetadata).to.equal(infoArray[3]);
            expect(rootNode.children[0].metadata[0]).to.equal(infoArray[4]);
            expect(rootNode.children[0].metadata[1]).to.equal(infoArray[5]);
            expect(rootNode.children[0].metadata[2]).to.equal(infoArray[6]);
            expect(rootNode.children[1].numChildren).to.equal(infoArray[7]);
            expect(rootNode.children[1].numMetadata).to.equal(infoArray[8]);
            expect(rootNode.children[1].metadata[0]).to.equal(infoArray[12]);
            expect(rootNode.children[1].children[0].numChildren).to.equal(infoArray[9]);
            expect(rootNode.children[1].children[0].numMetadata).to.equal(infoArray[10]);
            expect(rootNode.children[1].children[0].metadata[0]).to.equal(infoArray[11]);
        });
    });

    describe('Part 1', () => {
        it('should add all the metadata values for all nodes', () => {
            let metadataSum = addMetadataForAllNodes(rootNode);
            let expectedSum = 138;
            expect(metadataSum).to.equal(expectedSum);
        });
    });
    describe('Part 2', () => {
        it('should calculate the value of the root node', () => {
            let value = calculateNodeValue(rootNode);
            let expectedValue = 66;
            expect(value).to.equal(expectedValue);
        });
    });
});