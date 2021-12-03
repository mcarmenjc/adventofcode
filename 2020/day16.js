import { day16 as input } from './input.js';

class TicketField {
    name;
    validRanges;

    constructor(fieldString){
        this.#parseField(fieldString);
    }

    #parseField(fieldString){
        let parts = fieldString.split(':');
        this.name = parts[0];
        let ranges = parts[1].split('or');
        this.validRanges = [];
        
        for (let range of ranges){
            let limits = range.replace(/ /g, '').split('-');
            this.validRanges.push([Number.parseInt(limits[0]), Number.parseInt(limits[1])]);
        }
    }

    isValid(value){
        for(let range of this.validRanges){
            if (value >= range[0] && value <= range[1]){
                return true;
            }
        }

        return false;
    }
}

class Ticket {
    fields;

    constructor(ticketStr){
        this.fields = ticketStr.split(',').map(x => Number.parseInt(x))
    }

    getInvalidField(fieldsRules){
        for(let ticketField of this.fields){
            if (!this.#isTicketFieldValid(fieldsRules, ticketField)){
                return ticketField;
            }
        }

        return -1;
    }

    matchFieldsWithTypes(fields) {
        let matches = [];

        for (let field of this.fields){
            let fieldMatches = new Set();
            for (let i = 0; i < fields.length; i++){
                if (fields[i].isValid(field)){
                    fieldMatches.add(i);
                }
            }

            matches.push(fieldMatches);
        }

        return matches;
    }

    #isTicketFieldValid(fields, ticketField){
        for (let field of fields){
            if (field.isValid(ticketField)){
                return true;
            }
        }
    
        return false;
    }
    
}

function getAllFields(fieldsStr){
    let fieldsList = fieldsStr.split('\n');
    let fields = [];

    for(let fieldInfo of fieldsList){
        fields.push(new TicketField(fieldInfo));
    }

    return fields;
}

function getNearbyTickets(nearbyTicketsStr){
    let lines = nearbyTicketsStr.split('\n');
    let nearbyTickets = [];

    for (let line of lines){
        nearbyTickets.push(new Ticket(line));
    }

    return nearbyTickets;
}

function getErrorRate(fields, nearbyTickets){
    let errorRate = 0;

    for (let nearbyTicket of nearbyTickets){
        let invalidField = nearbyTicket.getInvalidField(fields);
        errorRate += invalidField;
    }
    
    return errorRate;
}

function getFieldsOrder(fields, nearbyTickets, myTicket){
    let validNearbyTickets = nearbyTickets.filter(x => x.getInvalidField(fields) === -1);
    let fieldsMatchesSets = myTicket.matchFieldsWithTypes(fields);

    for (let ticket of validNearbyTickets){
        let matches = ticket.matchFieldsWithTypes(fields);
        for(let i = 0; i < matches.length; i++){
            fieldsMatchesSets[i] = intersectMatches(fieldsMatchesSets[i], matches[i]);
        }
    }

    let fieldsOrder = {};

    while (Object.keys(fieldsOrder).length !== fields.length) {
        let valuesToRemove = [];
        for (let i = 0; i < fieldsMatchesSets.length; i++){
            if (fieldsMatchesSets[i].size === 1){
                fieldsOrder[i] = fieldsMatchesSets[i].values().next().value;
                valuesToRemove.push(fieldsOrder[i]);
            }
        }

        for (let value of valuesToRemove){
            for (let set of fieldsMatchesSets){
                if (set.has(value)){
                    set.delete(value);
                }
            }
        }

    }

    return fieldsOrder;
}

function intersectMatches(generalFieldSet, ticketMatchSet){
    let intersect = new Set();

    for(let match of generalFieldSet){
        if (ticketMatchSet.has(match)){
            intersect.add(match);
        }
    }

    return intersect;
}

function getDepartureValue(fields, fieldsOrder, myTicket){
    let departureValue = 1;

    for (let pos of Object.keys(fieldsOrder)){
        if (fields[fieldsOrder[pos]].name.includes('departure')){
            departureValue *= myTicket.fields[pos];
        }
    }

    return departureValue;
}

let fields = getAllFields(input.fields);
let nearbyTickets = getNearbyTickets(input.nearbyTickets);
let myTicket = new Ticket(input.yourTicket);
let errorRate = getErrorRate(fields, nearbyTickets);
let fieldOrder = getFieldsOrder(fields, nearbyTickets, myTicket);
let departureValue = getDepartureValue(fields, fieldOrder, myTicket);

console.log(`Answer part 1: ${(errorRate)}`);
console.log(`Answer part 2: ${(departureValue)}`);