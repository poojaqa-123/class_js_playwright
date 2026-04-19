interface BugReport {
    id : number;
    name : string;
    severity : string;
    stepsToReproduce : string[];

}

function loadBug(bug : BugReport) : void {
    console.log("BUG Report -> " + bug.id + "[" + bug.severity + "]" + bug.name );
    bug.stepsToReproduce.forEach( function (step: string , i : number){
        console.log( " " + (i+1) + "." + step )
    });

}

loadBug({
    id : 1,
    name : "VWO Login ",
    severity : "HIGH",
    stepsToReproduce : ["step1 : open app.vwo,com" , "step2 : enter valid creds" , "step3 : verify login message"]

})