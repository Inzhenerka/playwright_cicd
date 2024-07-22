import { expect, test } from "@playwright/test";

const url = "https://qa-stand-employees.inzhenerka.tech";
const login = "leonardo";
const pass = "leads";

test.describe("A", async () => {
  test("Before each", async ({ page }) => {
    await page.goto(url);

    const responsePromise = page.waitForResponse(
      (response) => response.url().endsWith("/login") && response.status() < 300
    );

    await page.locator("input[type=text]").fill(login);
    await page.locator("input[type=password]").fill(pass);
    await page.locator("button[type=submit]").click();

    const response = await responsePromise;
    const responseBody = await response.json();

    expect(responseBody["role"]).toStrictEqual("admin");
    expect(responseBody["displayName"]).toStrictEqual(login);
    expect(responseBody["login"]).toStrictEqual(login);
    expect(responseBody["userToken"]).not.toBeNull();

    await expect(page.locator("h6").first()).toHaveText(`👋 Привет, ${login}`);
  });

  test("Company info test", async ({ page }) => {
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().endsWith("/company") && response.status() < 300
    );

    await page.goto(url);

    const response = await responsePromise;
    const responseBody = await response.json();

    await page.locator(".MuiListItemIcon-root").first().click();

    const box = page.locator(".MuiDialog-paper");

    expect(box.locator(".MuiTypography-h6.MuiCardHeader-title"))
      .toHaveText(responseBody[0]["name"]);

    expect(box.locator(".MuiTypography-body1.MuiTypography-paragraph"))
      .toHaveText(responseBody[0]["description"]);

    expect(box.locator(".MuiChip-labelMedium")).toHaveText("Активна");
    expect(responseBody[0]["isActive"]).toBeTruthy();
  });

  //   // page.on("request", (request) =>
  //   //   console.log(">>", request.method(), request.url())
  //   // );
  //   // page.on("response", (response) =>
  //   //   console.log("<<", response.status(), response.url())
  //   // );

  //   // await page.route("**/company", (route) =>
  //   //   route.fulfill({
  //   //     status: 200,
  //   //     body: "[]",
  //   //   })

  //   await page.goto(url);

  //   // const responsePromise = page.waitForResponse("**/company");
  //   // const response = await responsePromise;

  test("Page on domcontentloaded", async ({ page }) => {
    page.on("domcontentloaded", (content) => {
      console.log(content);
    });
    console.log("Go to");
    await page.goto(url);
  });

  test("Page on download", async ({ page }) => {
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.goto("https://the-internet.herokuapp.com/upload");
    // await page.getByText("test-file.jpg").click()
    await page.locator("#file-upload").click();

    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("test-file.jpg");
    await page.locator("#file-submit").click();
  });

  test("On alert", async ({ page }) => {
    page.on("dialog", async (d) => {
      expect(d.message()).toStrictEqual("I am a JS Alert");
      await d.accept();
    });
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    await page.getByText("Click for JS Alert").click();
  });

  test("Создание компании только с названием", async ({ page }) => {
    const requestPromise = page.waitForResponse(
      (response) => response.url().endsWith("/login") && response.status() < 300
    );

    await page.getByTestId("AddIcon").first().click();
    const form = page.getByRole("dialog");
    await expect(form).toBeVisible();
    await form.locator("input[type=text]").first().fill("Test 2");
    await form.getByText("Добавить").last().click();

    const request = await requestPromise;
    expect(request.postDataJSON()).toEqual({
      name: "Test 2",
      description: "2",
    });
  });

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
        {
          type: "Описание",
          description:
            "Авторизованный пользователь может создать компанию с названием и описанием",
        },
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

// const response = await route.fetch();
// // Add a prefix to the title.
// let body = await response.text();
// body = body.replace('<title>', '<title>My prefix:');
// await route.fulfill({
//   // Pass all fields from the response.
//   response,
//   // Override response body.
//   body,
//   // Force content type to be html.
//   headers: {
//     ...response.headers(),
//     'content-type': 'text/html'
//   }
// });
