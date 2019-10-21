const routes = require('../../config').routes;

const makeStartBrowser = () => {
    const env = process.env.ENV || 'production';
    const baseUrl = routes[env];
    
    browser.driver.manage().window().maximize();
    browser.waitForAngularEnabled(false);
    browser.get(baseUrl);
}

module.exports = makeStartBrowser;