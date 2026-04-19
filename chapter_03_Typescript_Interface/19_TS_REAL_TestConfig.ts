interface TestConfig {
    browser: string;
    headless : boolean;
    baseURL : string;
    timeout? : number;
    retires? : number;
}

let ciConfig : TestConfig = {
    browser: "chrome",
    headless : true,
    baseURL : "https://staging.app.com"

}

let localConfig : TestConfig = {
    browser: "firefox",
    headless : false,
    baseURL : "https://staging.app.com",
    timeout : 1000,
    retires : 2

}

console.log("CI : " + ciConfig.browser + "| timeout "+ ciConfig.timeout);
console.log("Local : " + localConfig.browser + "| timeout "+ localConfig.timeout);
