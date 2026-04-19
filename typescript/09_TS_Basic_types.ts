let age : number = 20;
let pi : number = 3.14;
let num2 : 124154126342675;

let name1 : string = "Pooja";

let isTrue : boolean = true;
let nothing : null = null ;
let notUndefined : undefined = undefined;

//Arrays
let numbers : number[] = [1, 2, 3];
let strngarray : Array<string> = ["pratik" , "pooja" , "krishna"]

// any : avoid when possible
let anythinhg: any = "Hello";

//unknown : safer than any
let unknown1 : unknown = "Hello";

console.log("age : ", age);
console.log("name1 : ", name1);
console.log("isTrue : ", isTrue);
// console.log("notUndefined : ", + notUndefined);
// console.log("unknown : ", + unknown1);
// console.log("null  : ", + nothing);

console.log("name1 : ", + name1);
/* NAN = Not a number : The + in front of name1 tries to convert the string "Pooja" into a number. 
Since "Pooja" is not a valid numeric string, the conversion fails and the result is NaN (a number type, despite the name)

*/

