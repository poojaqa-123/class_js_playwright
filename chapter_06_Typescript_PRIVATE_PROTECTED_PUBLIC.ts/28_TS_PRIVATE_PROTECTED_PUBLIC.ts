/*
PUBLIC:  accessible everywhere inside the class, in child classes, and from outside. This is the default.
PRIVATE: accessible ONLY inside the class where it's defined. Not even child classes can access it. Enforced at COMPILE time only.
PROTECTED: accessible inside the class AND in child classes, but NOT from outside. 
           Perfect for Page Object Model ,BasePage can have protected methods that child pages use, but test files cannot access directly.
*/

class APIClient {
    public baseURL: string;
    private apiKey : string; // No # for private as its in the javascript , in TS directly use keyword private.
    protected timeout : number;

    constructor(baseURL: string, apiKey: string, timeout: number ){
        this.baseURL = baseURL;
        this.apiKey = apiKey;
        this.timeout = timeout;

    }

    private getAuthHeader(): string{
        return "Bearer" + this.apiKey;
    }

    public sendRequest(path: string): void {
        console.log("GET " + this.baseURL + path);
        console.log("Auth: " + this.getAuthHeader());
        console.log("Timeout: " + this.timeout + "ms");

    }
}

class UserAPIClient extends APIClient {
    getUsers(): void {

        console.log("Fetching users: (timeout: " + this.timeout + "ms)");
        console.log("URL " + this.baseURL + "/users");

    }
}

let client = new APIClient("https://api.staging.com", "secret_api_key", 5000);
console.log("BaseURL: " + client.baseURL);
client.sendRequest("/health");

console.log("-----------")

let client2 = new UserAPIClient("https://api2.staging.com", "secret_api_key_2", 6000);
client2.getUsers()
