interface Calculator {

    add ( a: number, b : number) : number;
    subtract (a : number, b : number) : number ;
    multiply : (a : number, b: number) => number ;

}

const cal : Calculator = {
    
    add : (a, b) => {return a + b},
    subtract : (a, b) => {return a - b},
    multiply : (a, b) => {return a * b},


}

console.log(cal);