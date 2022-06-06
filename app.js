let csvToJson = require('convert-csv-to-json');

let fileInputName = 'matches.csv'; 
let deliveriesInput = 'deliveries.csv'

let matchesArray=csvToJson.fieldDelimiter(",").getJsonFromCsv(fileInputName);
let deliveriesArray = csvToJson.fieldDelimiter(",").getJsonFromCsv(deliveriesInput);

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
    // console.log('Matches Played Per Each Year')
    // console.log(matchesPerYear)
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
    // console.log('Matches Won By Each Teams Over Years')
    // console.log(matchesWonByTeams)
}

function findExtraRunsConceededPerTeamsIn2016(){
      let runsConceededPerTeams = new Map();
      let match_id =[];
      for (let i of matchesArray){
          if (i['season']=='2016'){
              match_id.push(i['id']);
          }
        }
      for (let i of deliveriesArray){
          let id = i['match_id'];
          let bowlingTeam =  i['bowling_team'];
          let extraRuns = parseInt( i['extra_runs']); 

          for(let item in match_id){
        if(id == item){
            if(runsConceededPerTeams.has(bowlingTeam)){
                runsConceededPerTeams.set(bowlingTeam, runsConceededPerTeams.get(bowlingTeam)+extraRuns)
            }
            else{
                runsConceededPerTeams.set(bowlingTeam,extraRuns)
            }
        }
    }
    }
    console.log(runsConceededPerTeams)

}

matchesPlayedPerYear(matchesArray)
matchesWonByEachTeamsOverYears(matchesArray)
findExtraRunsConceededPerTeamsIn2016(matchesArray,deliveriesArray)