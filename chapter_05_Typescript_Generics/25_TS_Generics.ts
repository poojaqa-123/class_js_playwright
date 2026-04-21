function getString(name: string): string {
    return "Pooja";
}

function getResults<T>(results: T[]): T {
    return results[0]!;
}

let firstCode = getResults<number>([200, 201, 300, 400, 500]);
let secondCode = getResults<string>(["PASS", "FAIL", "SKIP"]);

console.log("firstCode: ", firstCode);
console.log("secondCode: ", secondCode);