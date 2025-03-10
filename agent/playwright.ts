import {
  chromium,
  devices,
  type Browser,
  type BrowserContext,
  type Page,
} from "playwright";

export type Playwright = {
  page: Page;
  browser: Browser;
  context: BrowserContext;
  close: () => Promise<void>;
};

export async function makePlaywright(
  opts: { headless?: boolean } = {},
): Promise<Playwright> {
  const browser = await chromium.launch({ headless: opts.headless });
  const context = await browser.newContext(devices["Desktop Chrome"]);

  // TODO await context.route('**.jpg', route => route.abort());
  const page = await context.newPage();

  return {
    page,
    browser,
    context,
    close: async () => {
      await context.close();
      await browser.close();
    },
  };
}
