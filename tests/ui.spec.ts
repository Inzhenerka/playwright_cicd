import { expect, test } from "@playwright/test";
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";

const url = "https://qa-stand-employees.inzhenerka.tech";

test.describe("Тесты на создание компании", async () => {
  test.beforeEach("Авторизоваться", async ({ page }) => {
    await page.goto(url);
    await page.locator("input[type=text]").fill("leonardo");
    await page.locator("input[type=password]").fill("leads");
    await page.locator("button[type=submit]").click();
    await expect(page.locator("h6").first()).toContainText("👋 Привет, ");
  });

  test(
    "Создание компании со всеми полями",
    {
      tag: "@Позитивный",
      annotation: { type: "severity", description: "critical" },
    },
    async ({ page }) => {
      await page.getByTestId("AddIcon").first().click();
      const form = page.getByRole("dialog");
      await expect(form).toBeVisible();
      await form.locator("input[type=text]").first().fill("Test 1");
      await form.locator("input[type=text]").last().fill("Desc 1");
      await form.getByText("Добавить").last().click();
      await expect(form).toBeHidden();
    }
  );

  test(
    "Создание компании только с названием",
    { tag: "@Позитивный" },
    async ({ page }) => {
      await page.getByTestId("AddIcon").first().click();
      const form = page.getByRole("dialog");
      await expect(form).toBeVisible();
      await form.locator("input[type=text]").first().fill("Test 2");
      await form.getByText("Добавить").last().click();
      await expect(form).toBeHidden();
    }
  );

  test(
    "Создание компании только с описанием",
    { tag: "@Негативный" },
    async ({ page }) => {
      await page.getByTestId("AddIcon").first().click();
      const form = page.getByRole("dialog");
      await expect(form).toBeVisible();
      await form
        .locator("input[type=text]")
        .last()
        .fill("Компания не будет создана");
      await expect(form.getByText("Добавить").last()).toBeDisabled();
    }
  );

  test(
    "Создание компании. Пробел, вместо названия",
    { tag: "@Негативный" },
    async ({ page }) => {
      await page.getByTestId("AddIcon").first().click();
      const form = page.getByRole("dialog");
      await expect(form).toBeVisible();
      await form.locator("input[type=text]").first().fill(" ");
      await form
        .locator("input[type=text]")
        .last()
        .fill("Компания не будет создана");
      await expect(form.getByText("Добавить").last()).toBeEnabled();
    }
  );
});

test.describe("Тесты на деактивацию", async () => {

  test.beforeEach("Авторизоваться", async ({ page }) => {
    // await allure.description(
    //   "This test attempts to log into the website using a login and a password. Fails if any error happens.\n\nNote that this test does not test 2-Factor Authentication.",
    // );
    // await allure.owner("John Doe");
    // await allure.tags("NewUI", "Essentials", "Authentication");
    // await allure.severity(Severity.CRITICAL);
    // await allure.link("https://example.com/docs", "Related Documentation");
    // await allure.issue("AUTH-123", "https://example.com/issues/AUTH-123");
    // await allure.tms("TMS-456", "https://example.com/tms/TMS-456");
    // await allure.label("package","com.example.web.essentials.authentication");

    // await allure.step("Step 1", async () => {
    //   // step without the body
    //   await allure.logStep("Log step");
    //   await allure.step("Sub-step 1", async () => {

    //   });
    // });

    await page.goto(url);
    await page.locator("input[type=text]").fill("leonardo");
    await page.locator("input[type=password]").fill("leads");
    await page.locator("button[type=submit]").click();
    await expect(page.locator("h6").first()).toContainText("👋 Привет, ");
  });

  test(
    "Создание компании со всеми полями",
    {
      tag: ["@Позитивный", "@smoke"],
      annotation: [
        { type: "Критичность", description: "critical" },
        { type: "Описание", description: "Авторизованный пользователь может создать компанию с названием и описанием" }
      ],
    },
    async ({ page }) => {
      await page.getByTestId("AddIcon").first().click();
      const form = page.getByRole("dialog");
      await expect(form).toBeVisible();
      await form.locator("input[type=text]").first().fill("Test 1");
      await form.locator("input[type=text]").last().fill("Desc 1");
      await form.getByText("Добавить").last().click();
      await expect(form).toBeHidden();
    }
  );
});
