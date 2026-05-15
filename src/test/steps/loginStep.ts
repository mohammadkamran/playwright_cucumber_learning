import { Given, Then, When } from "@cucumber/cucumber";
import { config } from "../../helper/env";
import { CustomWorld } from "../../hooks/world";
import { LoginPage } from "../../pages/LoginPage";

Given("User navigates to the application", async function (this: CustomWorld) {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.goto(config.baseUrl);
});

Given("User enter the username {string}", async function (this: CustomWorld, username: string) {
    await this.loginPage.enterUsername(username);
});

Given("User enter the password {string}", async function (this: CustomWorld, password: string) {
    await this.loginPage.enterPassword(password);
});

When("User click on the login button", async function (this: CustomWorld) {
    await this.loginPage.submit();
});

Then("Login should be success", async function (this: CustomWorld) {
    await this.loginPage.assertLoginSuccess();
});
