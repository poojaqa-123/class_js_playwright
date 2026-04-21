function wrapResponse<T>(statusCode: number, data : T): {statusCode: number; data : T} {
    return {statusCode: statusCode, data : data} ;
}

let response1 = wrapResponse<number>(200, 20);
console.log("response1: ", response1);

let response2 = wrapResponse<boolean>(200, true);
console.log("response2: ", response2);

let response3 = wrapResponse<string>(200, "pooja");
console.log("response3: ", response3);