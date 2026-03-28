const obj = {
    name1: "pooja",
    age: 32,
    phone: 1234567890,
    email: "poojakt123@gmail.com",
    address: {
        city: "Tembhurni",
        state: "MH",
        zip: "413211"
    }
}

console.log(obj);
console.log(obj.name1);

const { name1, age } = obj;
console.log(name1);
console.log(age);

const obj2 = { ...obj };
console.log(obj2);


console.log(Object.keys(obj));
console.log(Object.values(obj));
// console.log(Object.entries(obj));