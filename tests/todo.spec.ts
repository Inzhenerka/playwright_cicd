import { expect, test } from "@playwright/test";

test("Отображение 5 задач", async ({ page }) => {
  const trashIcons = page.locator("svg.fa-trash path");
  const inputField = page.locator("input");
  const addButton = page.locator("button");

  const getTodosResponse = page.waitForResponse(
    "https://todo-app-sky.herokuapp.com/"
  );
  await page.goto("https://sky-todo-list.herokuapp.com/");
  await getTodosResponse;

  // посчтать все задачи, которые сейчас есть
  const count = await trashIcons.count();

  // вот сколько задач, столько раз мы удаляем первую в списке и обновляем страницу
  for (let i = 0; i < count; i++) {
    await trashIcons.first().click();
    await page.reload();
    await getTodosResponse;
  }

  // 3 раз заполняем инпут текстом и жмем на кнопку
  // для верности, рефрешим страницу каждый раз

  await inputField.fill("Задача 1");
  await addButton.click();
  await page.reload()
  await getTodosResponse;
  
  await inputField.fill("Задача 2");
  await addButton.click();
  await page.reload()
  await getTodosResponse;

  await inputField.fill("Задача 3");
  await addButton.click();
  await page.reload()
  await getTodosResponse;

  // смотрим, что в списке отображается 5 задач
  await expect(page.locator("tr")).toHaveCount(3);
});

