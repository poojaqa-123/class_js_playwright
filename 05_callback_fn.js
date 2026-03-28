// callback fn is called at last in the function

const { default: test } = require("playwright/test");

function placeorder(item,callback){
    console.log("Placing order for "+item);
    callback();

}

//anonymouse function as callback fn
placeorder("burger",function(){
    console.log("order is placed !!!")
})

//arrow fn as callback fn
placeorder("icecake",()=> {

    console.log("icecake order is placed !!!")

})

//Callback with Parameters
console.log("--------------Callback with Parameters---")

function runTest(testName, callback){
    let status_p= "pass";
    let status_f= "fail";
    callback(testName, status_p)
    callback(testName, status_f)

}

runTest("Login Test",function(name, result){
    console.log(name + " -> " + result);
})

console.log("-----------------------------------------")

// sync callback
console.log("--------------Sync callback--------------")

let testResults = ["pass" , "fail" , "pass" , "pass"]

testResults.forEach(function (value, index) {
    console.log("Test" + index + " -> " + value);

})

console.log("------------------------------------------")

//async callback
console.log("--------------async callback--------------")

console.log("Test 1 calling")
setTimeout(function(){

    console.log("Test 2 calling")

},1000)

console.log("Test 3 calling")


console.log("------------------------------------------")


