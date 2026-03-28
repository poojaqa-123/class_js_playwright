//strings and literals

const name1 = "pooja";
const name2 = 'krushna';
const name3 = `Hello name1 is ${name1} and name2 is ${name2}`;
console.log(name3);

//string properties
const url = "https://www.google.com";
console.log(url.length);
console.log(url.charAt(0));
console.log(url.includes("google"));
console.log(url.startsWith("https"));
console.log(url.endsWith(".com"));
console.log(url.indexOf("google"));
console.log(url.lastIndexOf("google"));
console.log(url.replace("google", "facebook"));
console.log(url.slice(0, 10));  // slice(start, end)
console.log(url.slice(-3));  // slice(start, end) > com
console.log(url.substring(0, 10)); //substring(start, end), no negative number
console.log(url.toLowerCase());
console.log(url.toUpperCase());
console.log(url.trim());
console.log(url.split(".")); // split returns array ["https://www" , "google" , "com" ]
console.log(url.concat("/search"));
console.log(url.search(/google/));

// Transformation
console.log(parseInt("123px"));
console.log(parseFloat("123.45px"));
console.log(Number("123"));
console.log(String(123));
console.log(Boolean(123));
// console.log(null.toString());

// strings are immutable in js
let str = "hello";
upper = str.toUpperCase();
console.log(`str is ${str}`);
console.log(`upper is ${upper}`);





