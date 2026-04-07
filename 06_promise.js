/*
PROMISE:
states        ----->  functions
pending
fulfilled     ----->  resolve()  ----->  .then()
rejected      ----->  reject()   ----->  .catch()

                                         .finally() -----> default
*/

//resolve
let apiCall = new Promise(function(resolve, reject){
    resolve("resolved");

})

apiCall.then(function(msg){
    console.log("resolved -> " + msg)

})


//reject
let apiCall2 = new Promise(function(resolve, reject){
    reject("503 error");

})

apiCall2.catch(function(err){
     console.log("reject -> " + err)

})

//promise chaining
Promise.resolve(13)
.then(function(val){
    console.log(val);
    return val + 1;

}).then(function(val){
    console.log(val);
    return val + 1;

}).then(function(val){
    console.log(val);
})

// PROMISE Methods - all, allSettled, race, finally
// all
Promise.all([
    Promise.resolve("Task 1 completed"),
    Promise.resolve("Task 2 completed"),
    Promise.reject("Task 3 failed")

]).then(function(result){
    console.log("Promise.all : ");
    console.log(result);
    
}).catch(function(err){
    console.log("Promise.all : ");
    console.log(err);

})

// allSettled
Promise.allSettled([
    Promise.resolve("Task 1 completed"),
    Promise.resolve("Task 2 completed"),
    Promise.reject("Task 3 failed")
]).then((results) => { 
    console.log("Promise.allSettled : ");
    console.log(results);
})

// RACE 
Promise.race([
    Promise.resolve(setTimeout(function(){
        console.log("RACE Method: Fast execution 1000 sec")
    }, 1000)),

    Promise.resolve(setTimeout(function(){
        console.log("RACE Method: slow execution 5000 sec")

    },5000))

]).then((result) => console.log(result))

// finally
Promise.resolve("Finally Method : Task completed")
.then((result) => console.log(result))
.catch((error) => console.log(error))
.finally(() => console.log("Finally Method : cleanup completed"))




