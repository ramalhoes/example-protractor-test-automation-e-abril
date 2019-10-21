const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const moment = require("moment-timezone");
const placedAt = moment().add("hours").format("YYYY-MM-DDTHH:mm:ss");

const env = process.env.ENV || 'production';
const browserName = process.env.BROWSER || 'chrome';

const chromeOptions = { args: ["--headless", "--disable-gpu", "--window-size=1280,960", "whitelisted-ips=192.168.157.51"] }
const headlessFirefox = { 'moz:firefoxOptions': { args: ["--headless"] } }

const fileName = env + "-" + browserName + "-" + placedAt;
const savePath = `reports/${fileName}`;
const capabilities = { browserName };

if (browserName == "headlessChrome") { capabilities.browserName = "chrome"; capabilities.chromeOptions = chromeOptions; };
if (browserName == "headlessFirefox") { capabilities.browserName = "firefox", capabilities["moz:firefoxOptions"] = headlessFirefox["moz:firefoxOptions"] };

exports.config = {
    capabilities,
    specs: [`test/front-end/*.js`],
    getPageTimeout: 120000,
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 360000,
        isVerbose: true
    },
    onPrepare: function () {
        browser.ignoreSynchronization = true,
            jasmine.getEnv().addReporter(
                new Jasmine2HtmlReporter({
                    savePath,
                    screenshotsFolder: 'images',
                    fileName,
                    cleanDestination: false
                })
            );

        jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: 'all' }))
    },
};
