import { makePlaywright, type Playwright } from "./playwright";

const URL_BASE = "https://www.shufersal.co.il/online/he";
const URL_LOGIN = `${URL_BASE}/login`;

export async function login(
  playwrightInstance: Playwright,
  args: { email: string; password: string },
): Promise<void> {
  const { page } = playwrightInstance;
  const initialPageResponse = await page.goto(URL_LOGIN);
  if (initialPageResponse?.status() !== 200) {
    throw new Error(
      `${URL_LOGIN} returned unexpected status ${initialPageResponse?.status()}`,
    );
  }
  // check if already logged in
  if (page.url() !== URL_LOGIN) {
    try {
      await page.getByLabel("לחץ לכניסה לאזור האישי").waitFor();
    } catch (e) {
      throw new Error(
        `unexpected error: redirected from login page to ${page.url()} but can't find personal-area link`,
      );
    }
    console.info("already logged in");
    return;
  }

  await page.getByRole("textbox", { name: "כתובת מייל" }).fill(args.email);
  await page.getByRole("textbox", { name: "סיסמה" }).fill(args.password);

  // clicking on "knisa" calls /j_spring_security_check which returns a redirect to the homepage
  const requestListener = page.waitForRequest(
    (req) => req.url().includes("/j_spring_security_check"),
    { timeout: 10_000 }, // long timeout to avoid flakiness
  );
  await page.getByRole("button", { name: "כניסה" }).click();

  const request = await requestListener;
  const response = await request.response();
  if (!response) {
    throw new Error(
      `unexpected error: expected login response but got no response`,
    );
  }
  if (response.status() !== 302) {
    throw new Error(
      `unexpected error: expected login response http status 302 but got ${response?.status()}`,
    );
  }
  const redirectTo = await response?.headerValue("location");
  if (redirectTo?.includes("error=true")) {
    throw new Error(`login failed: redirected to ${redirectTo}`);
  }
  console.info("logged in successfully");
  return;
}
