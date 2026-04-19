interface BasePage {
    url : string;
    title : string;
}

interface LoginPage extends BasePage {
    usernameSelector : string;
    passwordSelector : string;
    loginButtonSelector : string;

}

interface FreeTrialPage extends BasePage {
    usernameSelector : string;
    submitButtonSelector : string;

}

let loginPage : LoginPage = {
    url : "/login",
    title : "Login Page",
    usernameSelector : "#username",
    passwordSelector : "#password" ,
    loginButtonSelector : "#button"
}

let freeTrialPage : FreeTrialPage = {
    url : "/free-trial",
    title : "Free Trial Page",
    usernameSelector : "#username",
    submitButtonSelector : "#button"
}

console.log("URL : " + loginPage.url + " Title : " + loginPage.title + " Username : " + loginPage.usernameSelector);
console.log("------------------------")
console.log("URL : " + freeTrialPage.url + " Title : " + freeTrialPage.title + " Username : " + freeTrialPage.usernameSelector);
