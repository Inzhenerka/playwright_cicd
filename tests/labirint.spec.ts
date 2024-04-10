import {test} from "@playwright/test";
import { MainPage } from "../pages/mainPage"
import { ResultPage } from "../pages/resultPage"
import { CartPage } from "../pages/cartPage"

test("Поиск по сайту", async ({page}) => {
  const mainPage = new MainPage(page);
  const resultPage = new ResultPage(page)
  const cartPage = new CartPage(page)

  await mainPage.openPage();
  await mainPage.searchFor("Javascript");

  const priceToBe = await resultPage.getPriceForItem(0);
  await resultPage.addItemToCart(0)
  
  await cartPage.openPage();
  await cartPage.checkTotalPrice(priceToBe)
});

test("Поиск по сайту (пустая выдача)", async ({ page }) => {
  const mainPage = new MainPage(page);
  const resultPage = new ResultPage(page)
  const cartPage = new CartPage(page)

  await mainPage.openPage();
  await mainPage.searchFor("Эйяфьядлайёкюдль");

  await resultPage.checkEmptySearchResultIsPresent()
  
  await cartPage.openPage();
  await cartPage.checkEmptyCartMessageIsPresent()
});


