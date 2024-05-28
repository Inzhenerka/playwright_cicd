import { expect, test } from "@playwright/test";
import { allure } from "allure-playwright";

const url = "https://qa-stand-employees.inzhenerka.tech";
const login  = "leonardo";
const pass = "leads";

test.describe("Тесты на создание компании", async () => {
  
  test.beforeEach("Before each", async ({ page }) => {
    await allure.step("Авторизоваться на сайте", async () => {
      await allure.step("Открыть страницу", async () => {
        await page.goto(url);
      });
      await allure.step(`Ввести логин ${login}`, async () => {
        await page.locator("input[type=text]").fill(login);
      });
      await allure.step(`Ввести пароль ${pass}`, async () => {
        await page.locator("input[type=password]").fill(pass);
      });
      await allure.step("Нажать кнопку Войти", async () => {
        await page.locator("button[type=submit]").click();
        await allure.step("Дождаться приветственного сообщения", async () => {
          await expect(page.locator("h6").first()).toContainText("👋 Привет, ");
        });  
      });
    });
  });

  test(
    "Создание компании со всеми полями",
    async ({ page }) => {
      await allure.epic("Компании");
      await allure.feature("Добавление компаний");
      await allure.story("Позитивные тесты");

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



// await allure.step("Step 1", async () => {
//   // step without the body
//   await allure.logStep("Log step");
//   await allure.step("Sub-step 1", async () => {

//   });
// });