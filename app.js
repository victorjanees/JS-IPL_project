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
    console.log('Matches Played Per Each Year')
    console.log(matchesPerYear)
    }

function matchesWonByEachTeamsOverYears(){
    let matchesWonByTeams = new Map();
    let teams = [];
    for(let i of matchesArray){
        teams.push(i['winner']);
        }
    for (let i of teams){
        if (matchesWonByTeams.has(i)){
            matchesWonByTeams.set(i,matchesWonByTeams.get(i)+1)
        }
        else{
            matchesWonByTeams.set(i,1)
        }
    }
    console.log('Matches Won By Each Teams Over Years')
    console.log(matchesWonByTeams)
}
    

matchesPlayedPerYear(matchesArray)
matchesWonByEachTeamsOverYears(matchesArray)