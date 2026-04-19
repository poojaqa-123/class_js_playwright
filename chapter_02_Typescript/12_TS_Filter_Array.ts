let responseCode : number[] = [200, 201, 203, 404, 500];

function getFailedCodes(codes : number[]): number[] {

    return codes.filter(function (code : number){
        return code >= 400;
    })

}

console.log("All responseCode : ", responseCode);
console.log("Failed responseCode : ", getFailedCodes(responseCode));
