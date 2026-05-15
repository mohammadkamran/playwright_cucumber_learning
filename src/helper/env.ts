function resolveHeadless(): boolean {
    if (process.env.HEADLESS === "true") return true;
    if (process.env.HEADLESS === "false") return false;
    return Boolean(process.env.CI);
}

export const config = {
    baseUrl: process.env.BASE_URL ?? "https://practicetestautomation.com/practice-test-login/",
    headless: resolveHeadless()
};
