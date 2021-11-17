import { day1 as data } from './input.js'

function find2ReportEntriesThatAdd2020(reportEntries){
  for (let entry of Object.keys(reportEntries)) {
    let diff = 2020 - entry;
  
    if (reportEntries[diff] !== undefined){
      let product = entry * diff;
      console.log(`${entry} + ${diff}`);
      return product;
    }
  }

  return 0;
}

function find3ReportEntriesThatAdd2020(reportEntries){
  let entries = Object.keys(reportEntries);
  let length = entries.length;
  for(let i = 0; i < length; i++){
    let remaining = 2020 - entries[i];
    for (let j = i+1; j < length; j++){
      if (entries[j] < remaining){
        let diff = remaining - entries[j];
        if (reportEntries[diff] !== undefined){
          console.log(`${entries[i]} + ${entries[j]} + ${diff}`);
          let product = entries[i] * entries[j] * diff;
          return product;
        }
      }
    }
  }

  return 0;
}

function mapReportEntries(data){
  let reportEntries = data.reduce((map, value) => {
    if (value < 2020){
      map[value] = true;
    }
    return map;
  }, {});

  return reportEntries;
}

const reportEntries = mapReportEntries(data);
console.log(find2ReportEntriesThatAdd2020(reportEntries));
console.log(find3ReportEntriesThatAdd2020(reportEntries));