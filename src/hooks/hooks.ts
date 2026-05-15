import { After, AfterAll, Before, BeforeAll, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, chromium } from "@playwright/test";
import fs from "fs";
import { config } from "../helper/env";
import { CustomWorld } from "./world";

let browser: Browser;

setDefaultTimeout(60 * 1000);

BeforeAll(async function () {
    fs.mkdirSync("reports/screenshots", { recursive: true });
    fs.mkdirSync("reports/traces", { recursive: true });
    fs.mkdirSync("reports/videos", { recursive: true });

    browser = await chromium.launch({ headless: config.headless });
});

Before(async function (this: CustomWorld) {
    this.context = await browser.newContext({
        recordVideo: { dir: "reports/videos" }
    });
    await this.context.tracing.start({
        screenshots: true,
        snapshots: true,
        sources: true
    });
    this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario) {
    const scenarioName = scenario.pickle.name.replace(/[^a-z0-9]+/gi, "_").toLowerCase();
    const tracePath = `reports/traces/${scenarioName}.zip`;

    if (this.page && scenario.result?.status === Status.FAILED) {
        const screenshot = await this.page.screenshot({
            path: `reports/screenshots/${scenarioName}.png`,
            fullPage: true
        });
        await this.attach(screenshot, "image/png");
    }

    if (this.context) {
        await this.context.tracing.stop({ path: tracePath });
        await this.attach(`Playwright trace: ${tracePath}`, "text/plain");
    }
    await this.page?.close();
    await this.context?.close();
});

AfterAll(async function () {
    await browser?.close();
});
