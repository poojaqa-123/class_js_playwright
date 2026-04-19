interface TestCase {
    id : number;
    name : string;
    status : string;
    timeout: number;
}

const test1 : TestCase = {
    id : 1,
    name : "Login Test",
    status : "PASS",
    timeout: 1300

}

console.log( "TC" + test1.id + " : " + test1.name +  " -> " + test1.status + " (" + test1.timeout + "ms)");

const test2 : TestCase = {
    id : 1,
    name : "Registration Test",
    status : "PASS",
    timeout: 1000

}

console.log( "TC" + test2.id + " : " + test2.name +  " -> " + test2.status + " (" + test2.timeout + "ms)");