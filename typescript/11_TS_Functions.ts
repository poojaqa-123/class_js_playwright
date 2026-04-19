function add(a : number, b : number) : number{
    return a + b;
}

function sayHi() : string{
    return "Hiiiiii";

}

let arrowFunctionMultiply = (a : number, b : number) : number  => {return a * b}


console.log(add(10,20));
console.log(sayHi());
console.log(arrowFunctionMultiply(10,30));