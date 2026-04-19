//Array

let statusCode : number[] = [200, 201, 203, 404, 500];
let testSuit: string[] = ["Smoke", "Regression", "Sanity"]

console.log("statusCodes : ", statusCode);
console.log("testSuit : ", testSuit);

// Object in ts

let testResult : {name1 : string, status : string, duration : number } = {
     name1 : "LoginTest",
     status : "PASS",
     duration : 1200
}

console.log(testResult.name1 , " -> ", testResult.status , "(", testResult.duration, "ms)");


// Object in js
/*
    let testResult = {
        name1 : "LoginTest",
        status : "PASS",
        duration : 1200
    }
*/