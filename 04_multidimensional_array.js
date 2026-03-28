
let md_array = [

    ["pooja", 30, "QA"],
    ["pratik", 31, "LIC"],
    ["krushna" , 28, "animation"]

]

for(let i=0; i < md_array.length; i++){

    for(let j=0; j < md_array[i].length; j++){
        console.log(md_array[i][j])
        console.log(" ")

    }
    console.log(" ")
}

console.log(" ------------------- ")

// for(let row of md_array){

//     for(cell of row){
//         processingInstruction.stdout

//     }

// }

//pattern
for(let i=1; i <= 5; i++){

    let row = "";
    for(let j=1; j <= i; j++){

       row = row + "*" ;

    }
    console.log(row);
}