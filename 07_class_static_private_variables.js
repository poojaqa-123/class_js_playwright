// static Variables and Methods :
// Shared smong objects, 
// Accessed with class name

class Student {
    #account_balance; // private variable, accessed only by claa methods, cant access in static method
    static college_name = "Sinhgad College";
    static counter=0;
    
    constructor(name,balance){
        this.#account_balance=balance;
        this.name = name;
        console.log(this.name + " is student of " + Student.college_name);
        Student.counter++;
    }

    static printConter(){
        console.log("counter value : " + Student.counter)
    }

    studentInfo(name){
        return this.name + " has account balance : " + this.#account_balance;
    }


}

std1 = new Student("Pooja",50000)

Student.printConter();

console.log(std1.studentInfo("Pooja"));