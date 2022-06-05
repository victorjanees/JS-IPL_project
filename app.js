let csvToJson = require('convert-csv-to-json');

let fileInputName = 'matches.csv'; 
let fileOutputName = 'myOutputFile.json';

let matchesArray=csvToJson.fieldDelimiter(",").getJsonFromCsv(fileInputName);
// console.log(matchesArray);

function matchesPlayedPerYear(){
    let matchesPerYear = new Map();
    let season = [];
    for(let i of matchesArray){
        season.push(i['season']);
        }
    for (let i of season){
        if (matchesPerYear.has(i)){
            matchesPerYear.set(i,matchesPerYear.get(i)+1)
        }
        else{
            matchesPerYear.set(i,1)
        }
    }
    console.log(matchesPerYear)
    }
    

matchesPlayedPerYear(matchesArray)