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
                } else {
                    runsConceededPerTeams.set(bowlingTeam,extraRuns)
                }
            }
        }
    }
    
    console.log(runsConceededPerTeams)
}

function economicalBowlerOf2015(){
    let runsGiven = new Map;
    let ballsBowled = new Map;
    let economicalBowlers = new Map();
    let match_id = [];
    for (let i of matchesArray){
        if (i['season']=='2015'){
            match_id.push(i['id']);
        }
    }

    for (let i of deliveriesArray){
        let id = i['match_id'];
        let bowler = i['bowler'];
        let totalRuns = parseInt( i['total_runs']);

        for(let items of match_id){
            if(id == items){
                if(runsGiven.has(bowler)){
                    runsGiven.set(bowler,runsGiven.get(bowler) + totalRuns)
                } else{
                    runsGiven.set(bowler,totalRuns)
                }
                if(ballsBowled.has(bowler)){
                    ballsBowled.set(bowler,ballsBowled.get(bowler) + 1)
                } else{
                    ballsBowled.set(bowler,1)
                }
            }
        }
             
    } 

    ballsBowled.forEach((value,key)=>{
        let updatedValue=value/6.0;
        ballsBowled.set(key,updatedValue)
    });

    // console.log(ballsBowled)
    // console.log(runsGiven)
         
    // for (let i of runsGiven.keys()){
    //     if (economicalBowlers.has(i)){
    //         economicalBowlers.set(i,economicalBowlers.get(i)/ballsBowled.get(i))
    //     }
    //     else{
    //         economicalBowlers.set(i,bowler.get(bowler))
    //     }
    // }

    
    for(let bowler of runsGiven.keys()) {
        // console.log(typeof bowler);
        // economicalBowlers.set(bowler) = runsGiven[bowler] / ballsBowled[bowler];

        economicalBowlers.set(bowler, runsGiven.get(bowler) / ballsBowled.get(bowler));
    }

    console.log(economicalBowlers);

}


function totalSixesByTeams(){
let sixes = new Map;
for (let i of deliveriesArray){
    let teams = i['batting_team'];
    let runs = i['batsman_runs'];
    if (runs == '6'){
        
        if (sixes.has(teams)){
            sixes.set(teams,sixes.get(teams)+1)
        }
        else{
        sixes.set(teams,1)
    }
}
}
console.log(sixes)
}

matchesPlayedPerYear(matchesArray)
matchesWonByEachTeamsOverYears(matchesArray)
findExtraRunsConceededPerTeamsIn2016(matchesArray,deliveriesArray)
economicalBowlerOf2015(matchesArray,deliveriesArray)
totalSixesByTeams(deliveriesArray)