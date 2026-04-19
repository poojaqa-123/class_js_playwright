interface APIResponse {
    readonly statusCode : number;
    body: string;
    headers? : string;
    responseTime? : number;
}

// readonly = can not edit
// ? = optional

let response : APIResponse = {
    statusCode : 200,
    body : '{ "name" : "pooja" }'
}

console.log("Status code : " , response.statusCode);
console.log("body : " , response.body);
console.log("headers : " , response.headers);

console.log("-----------------------");

interface Point {
    readonly x : number;
    readonly y : number;
}

let point : Point =  { x : 10, y : 20}
// point.x = 5 -> this is not possible due to readonly

//readonly array 

interface Data {
    readonly items : readonly number [];
}
