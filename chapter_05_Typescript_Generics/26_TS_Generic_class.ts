class TestDataStorage<T> {
    private items : T[] = [];

    add(item: T){
        this.items.push(item);
    }

    getFirstItem(): T {
        return this.items[0]!;
    }

    getAllItems(): T[] {
        return this.items;
    }

    count() : number {
        return this.items.length;
    }

}

let codeStore = new TestDataStorage<number>();
let teststore = new TestDataStorage<string>();

codeStore.add(200);
codeStore.add(400);
codeStore.add(500);

teststore.add("PASS");
teststore.add("FAIL");

console.log("Codes:", codeStore.getAllItems());
console.log("First code:", codeStore.getFirstItem());
console.log("Tests:", teststore.getAllItems());
console.log("Test count:", teststore.count());