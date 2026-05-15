# playwright_cucumber

End-to-end test framework using [Playwright](https://playwright.dev) with [Cucumber.js](https://github.com/cucumber/cucumber-js) and TypeScript.

## Requirements

- Node.js 20 or newer
- npm

## Setup

```bash
npm ci
npx playwright install --with-deps chromium
```

## Running tests

```bash
npm test               # all features
npm run test:smoke     # only @smoke-tagged scenarios
```

Results land in `reports/`:
- `reports/index.html` — HTML report (generated post-run)
- `reports/cucumber-report.json` — raw Cucumber JSON
- `reports/screenshots/` — captured on scenario failure
- `reports/traces/` — Playwright trace per scenario (open with `npx playwright show-trace <file>`)
- `reports/videos/` — recorded session per scenario

## Environment variables

| Variable    | Default                                                          | Purpose                                                                                                       |
| ----------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `BASE_URL`  | `https://practicetestautomation.com/practice-test-login/`        | Application under test                                                                                        |
| `HEADLESS`  | auto (headless on CI, headed locally)                            | Auto-detected from `CI` env var. Force with `HEADLESS=true` (always headless) or `HEADLESS=false` (always headed) |
| `TEST_ENV`  | `local`                                                          | Surfaced in the HTML report metadata                                                                          |

Example:

```bash
HEADLESS=false BASE_URL=https://staging.example.com npm test
```

## Project layout

```
src/
  helper/
    env.ts          # Centralized config (BASE_URL, HEADLESS)
    report.js       # Generates HTML report from cucumber-report.json
  hooks/
    hooks.ts        # BeforeAll/AfterAll for browser, Before/After for context+page
    world.ts        # CustomWorld — per-scenario state (page, context, pages)
  pages/
    LoginPage.ts    # Page Object for the login screen
  test/
    features/       # Gherkin .feature files
    steps/          # Cucumber step definitions
```

## Adding a new test

1. Drop a `.feature` file under `src/test/features/`. Tag it (`@smoke`, `@regression`, etc).
2. Add a Page Object under `src/pages/` if it touches a new screen.
3. Implement steps in `src/test/steps/`. Type the callback `this` as `CustomWorld` so `this.page` etc. are typed.

## Parallel execution

Cucumber `parallel` is set to `1` in [cucumber.json](cucumber.json). Each worker is a separate Node process, so the world-scoped `page`/`context` is safe to increase. Bump cautiously — the HTML reporter aggregates the JSON output regardless of worker count.

## CI

[.github/workflows/playwright.yml](.github/workflows/playwright.yml) installs deps, installs the Chromium browser, runs `npm test` headlessly, and uploads `reports/` as an artifact.
