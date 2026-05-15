const reporter = require("multiple-cucumber-html-reporter");

reporter.generate({
    jsonDir: "reports",
    reportPath: "reports",
    reportName: "Playwright Cucumber Test Report",
    pageTitle: "Playwright Cucumber Test Report",
    displayDuration: true,
    metadata: {
        browser: {
            name: "chromium"
        },
        platform: {
            name: process.platform
        }
    },
    customData: {
        title: "Run Info",
        data: [
            { label: "Project", value: "playwright_cucumber" },
            { label: "Environment", value: process.env.TEST_ENV || "local" },
            { label: "Headless", value: process.env.HEADLESS === "false" ? "false" : "true" }
        ]
    }
});
