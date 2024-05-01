import { expect, test } from "@playwright/test";

test("Тест на авторизацию", async ({ page }) => {
  await page.goto("http://uitestingplayground.com/sampleapp");

  const userName = page.locator("[name=UserName]");
  const password = page.locator("[name=Password]");
  const status = page.locator("#loginstatus1");
  // const button = page.locator("#login");

  await userName.fill("Playwright");
  await password.fill("pwd");

  await page.getByText("Log in").click();

  const textToBe = "Welcome, Playwright!!";

  await expect(status).toHaveText(textToBe);
});


test("Калькулятор", async ({ page }) => {
    await page.goto("https://bonigarcia.dev/selenium-webdriver-java/slow-calculator.html");
  
    const delay = page.locator("#delay");
    const calculator = page.locator("#calculator")

    await delay.fill("3");

    await calculator.getByText("7").click();
    await calculator.getByText("+").click();
    await calculator.getByText("9").click();
    await calculator.getByText("=").click();

    await expect(calculator.locator(".screen")).toHaveCSS("font-size", "17px");
    await expect(calculator.locator(".btn-outline-primary")).toHaveCount(7);
  });

  //
  // [name=UserName] – инструкция, как найти элемент
  //

// CSS
// .text-success {} => <tag class="text-success" />
// h1 {}  => <h1 />
// #redButton => <tag attr1="" attr2="" id="redButton" />
// [href=ya.ru] => <a href="ya.ru" />

// xPath
// html/body/section/div/div[2]/div/input
// //*[@name="UserName"]
