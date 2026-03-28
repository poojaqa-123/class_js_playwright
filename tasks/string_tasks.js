// ✅ Validate URL contains expected environment


let url = "https://staging.myapp.com/dashboard";

url.includes("staging");

url.startsWith("https");

url.endsWith("/dashboard");

// ----------------

let log = "[ERROR] 2024-03-07 TestCase: login - Status: 500";

let status = log.match(/Status: (\d+)/)[1]; 
//ANS : status = "500"

// ----------------

let env = "staging"; let module = "auth"; let count = 7; 
let testId = `${env}_${module}_${String(count).padStart(3, "0")}`;
// stagin_auth_"7"..padStart(3, "0")}` = 
// ANS : staging_auth_007

// ----------------

let actual = " PASS "; let expected = "pass"; actual.trim().toLowerCase() === expected; // true

// ----------------

let testUrl = "https://app.com/search?query=login&page=2&sort=asc"; 
let params = Object.fromEntries(
  testUrl
    .split("?")[1]        // → "query=login&page=2&sort=asc"
    .split("&")           // → ["query=login", "page=2", "sort=asc"]
    .map(p => p.split("=")) // → [["query","login"], ["page","2"], ["sort","asc"]]
);

// ANS : { query: "login", page: "2", sort: "asc" }

// ----------------

let token = "Bearer eyJhbGciOiJIUzI1NiJ9.secret"; 
let masked = token.replace(/(?<=Bearer ).+/, "***REDACTED***");