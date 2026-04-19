enum Browser {
    Chrome = "chrome",
    Firefox = "firefox",
    Safari = "safari",
    Edge = "edge"
}

function launchBrowser( browser : Browser) : void {

    switch(browser){

        case Browser.Chrome:
            console.log("Launching chrome");
            break;
        case Browser.Firefox:
            console.log("Launching Gecko");
            break;
        case Browser.Safari:
            console.log("Launching safari");
            break;
        case Browser.Edge:
            console.log("Launching edge");
            break;
    }
}

launchBrowser(Browser.Chrome);

launchBrowser(Browser.Edge);
