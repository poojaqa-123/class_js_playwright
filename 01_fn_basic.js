//basic function
function hello(name){
    return `Hello ${name}`
}

const callFunct = hello("Pooja");
console.log(callFunct);

// function exression
const functExp = function (name){
    return `Hello ${name}`

}

console.log(functExp("Krushna"));

// Arrow function 
const fuctArrow = (name) => {
    return `Hello ${name}`

}

console.log(functExp("Ghobuuuuu"));

// Immediately Invoked Function Expression (IIFE)
(function (){
    console.log("hello") 

})();

(() => {
    console.log("hiiii") 

})();



