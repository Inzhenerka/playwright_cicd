import { Page, Locator } from "@playwright/test";

export class MainPage{
    page: Page;
    cookieAcceptButton: Locator;
    searchField: Locator;

    constructor(page){
        this.page = page;
        this.cookieAcceptButton = page.locator(".cookie-policy button");
        this.searchField = page.locator("#search-field");
    }
    
    async openPage() {
        await this.page.goto("https://www.labirint.ru");
        await this.cookieAcceptButton.click();
    }

    async searchFor(term){
          await this.searchField.fill(term);
          await this.searchField.press("Enter");
    }
}