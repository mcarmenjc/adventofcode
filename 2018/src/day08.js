//day 07
import {readFileSync} from 'fs';

let Node = class {
    constructor(numChildren, numMetadata){
        this.numChildren = numChildren;
        this.numMetadata = numMetadata;
        this.children = [];
        this.metadata = [];
    }

    addChild(child){
        this.children.push(child);
    }

    addMetadataEntry(metadataEntry){
        this.metadata.push(metadataEntry);
    }

    sumMetadataEntries(){
        let sum = 0;
        this.metadata.forEach(m => {
            sum += m;
        });
        return sum;
    }

    print(){
        console.log('num children => ' + this.numChildren);
        console.log('children :');
        this.children.forEach(c => {console.log(c.numChildren + ' - ' + c.numMetadata);});
        console.log('num metadata entries => ' + this.numMetadata);
        console.log('metadata entries :');
        this.metadata.forEach(c => {console.log(c);});
    }
}

function partOne(tree){
    console.log('The sleigh is much easier to pull than you\'d expect for something its weight. Unfortunately, neither you nor the Elves know which way the North Pole is from here.');
    console.log('You check your wrist device for anything that might help. It seems to have some kind of navigation system! Activating the navigation system produces more bad news: "Failed to start navigation system. Could not read software license file."');
    console.log('The navigation system\'s license file consists of a list of numbers (your puzzle input). The numbers define a data structure which, when processed, produces some kind of tree that can be used to calculate the license number.');
    console.log('The tree is made up of nodes; a single, outermost node forms the tree\'s root, and it contains all other nodes in the tree (or contains nodes that contain nodes, and so on).');
    console.log('Specifically, a node consists of:');
    console.log('A header, which is always exactly two numbers:');
    console.log('The quantity of child nodes.');
    console.log('The quantity of metadata entries.');
    console.log('Zero or more child nodes (as specified in the header).');
    console.log('One or more metadata entries (as specified in the header).');
    console.log('Each child node is itself a node that has its own header, child nodes, and metadata. For example:');
    console.log('2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2');
    console.log('A----------------------------------');
    console.log('    B----------- C-----------');
    console.log('                     D-----');
    console.log('In this example, each node of the tree is also marked with an underline starting with a letter for easier identification. In it, there are four nodes:');
    console.log('A, which has 2 child nodes (B, C) and 3 metadata entries (1, 1, 2).');
    console.log('B, which has 0 child nodes and 3 metadata entries (10, 11, 12).');
    console.log('C, which has 1 child node (D) and 1 metadata entry (2).');
    console.log('D, which has 0 child nodes and 1 metadata entry (99).');
    console.log('The first check done on the license file is to simply add up all of the metadata entries. In this example, that sum is 1+1+2+10+11+12+2+99=138.');
    console.log('What is the sum of all metadata entries?');
    console.log('-----------------------------------');
    console.log('Your puzzle answer was  ' + addMetadataForAllNodes(tree));
    console.log('-----------------------------------');
}

function addMetadataForAllNodes(rootNode){
    let nodes = [];
    nodes.push(rootNode);
    let metadataSum = 0;

    while(nodes.length > 0){
        let node = nodes.shift();
        metadataSum += node.sumMetadataEntries();
        node.children.forEach(n => {
            nodes.push(n);
        });
    }

    return metadataSum;
}


function partTwo(tree){
    console.log('--- Part Two ---');
    console.log('The second check is slightly more complicated: you need to find the value of the root node (A in the example above).');
    console.log('The value of a node depends on whether it has child nodes.');
    console.log('If a node has no child nodes, its value is the sum of its metadata entries. So, the value of node B is 10+11+12=33, and the value of node D is 99.');
    console.log('However, if a node does have child nodes, the metadata entries become indexes which refer to those child nodes. A metadata entry of 1 refers to the first child node, 2 to the second, 3 to the third, and so on. The value of this node is the sum of the values of the child nodes referenced by the metadata entries. If a referenced child node does not exist, that reference is skipped. A child node can be referenced multiple time and counts each time it is referenced. A metadata entry of 0 does not refer to any child node.');
    console.log('For example, again using the above nodes:');
    console.log('Node C has one metadata entry, 2. Because node C has only one child node, 2 references a child node which does not exist, and so the value of node C is 0.');
    console.log('Node A has three metadata entries: 1, 1, and 2. The 1 references node A\'s first child node, B, and the 2 references node A\'s second child node, C. Because node B has a value of 33 and node C has a value of 0, the value of node A is 33+33+0=66.');
    console.log('So, in this example, the value of the root node is 66.');
    console.log('What is the value of the root node?');
    console.log('-----------------------------------');
    console.log("Your puzzle answer was  " + calculateNodeValue(tree));
    console.log('-----------------------------------');
}

function calculateNodeValue(rootNode){ 
    if(rootNode.numChildren === 0){
        return rootNode.sumMetadataEntries();
    }
    else{
        let value = 0;
        rootNode.metadata.forEach(m => {
            if (m-1 < rootNode.numChildren){
                value += calculateNodeValue(rootNode.children[m-1]);
            }
        });
        return value;
    }
}

function day08(){
    console.log("--- Day 8: Memory Maneuver ---");
    let tree = readTree();
    partOne(tree);
    let start2 = readTree();
    partTwo(start2); 
    console.log('\n\n');
}

function readTree(){
    let fileContent = readFileSync('resources/day08_input.txt', 'utf8');
    return generateTree(fileContent.split(' '));
}

function generateTree(infoArray){
    let rootNode = createNode(parseInt(infoArray.shift()), parseInt(infoArray.shift()), infoArray);
    return rootNode;
}

function createNode(numChildren, numMetadata, infoArray){
    let node = new Node(numChildren, numMetadata);
    for (let i = 0; i < numChildren; i++){
        let childNode = createNode(parseInt(infoArray.shift()), parseInt(infoArray.shift()), infoArray);
        node.addChild(childNode);
    }
    for (let i = 0; i < numMetadata; i++){
        node.addMetadataEntry(parseInt(infoArray.shift()));
    }
    return node;
}

export { day08, generateTree, Node, addMetadataForAllNodes, calculateNodeValue };