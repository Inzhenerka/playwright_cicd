import { expect, test } from "@playwright/test";

test("Тест на авторизацию", async ({ page }) => {
  await page.goto("http://uitestingplayground.com/sampleapp");

  const userName = page.locator("[name=UserName]");
  const password = page.locator("[name=Password]");
  const status = page.locator("#loginstatus");
  const button = page.locator("#login");

  await userName.fill("Playwright");
  await password.fill("pwd");

  await button.click();

  const textToBe = "Welcome, Playwright!";

  await expect(status).toHaveText(textToBe);
});
 