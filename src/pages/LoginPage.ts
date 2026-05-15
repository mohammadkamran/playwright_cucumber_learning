import { expect, Page } from "@playwright/test";

export class LoginPage {
    private readonly username = "#username";
    private readonly password = "#password";
    private readonly submitButton = "#submit";

    constructor(private readonly page: Page) {}

    async goto(baseUrl: string) {
        await this.page.goto(baseUrl, { waitUntil: "networkidle" });
    }

    async enterUsername(username: string) {
        await this.page.locator(this.username).fill(username);
    }

    async enterPassword(password: string) {
        await this.page.locator(this.password).fill(password);
    }

    async submit() {
        await this.page.locator(this.submitButton).click();
    }

    async assertLoginSuccess() {
        await expect(this.page).toHaveURL(/\/logged-in-successfully\/$/);
        await expect(
            this.page.getByRole("heading", { name: "Logged In Successfully" })
        ).toBeVisible();
        await expect(
            this.page.getByText("Congratulations student. You successfully logged in!")
        ).toBeVisible();
    }
}
