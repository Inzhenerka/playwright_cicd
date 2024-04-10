import {Page, Locator, expect} from "@playwright/test";

export class ResultPage{
    page: Page;
    cards: Locator;
    emptyResultMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.cards = page.locator(".product-card")
        this.emptyResultMessage = page.locator("h1").first();
    }

    async getPriceForItem(index: number){
        const price: string|null = await this.cards.nth(index).locator(".product-card__price-current").textContent()
        return price!.trim();
    }

    async addItemToCart(index: number){
        await this.cards.nth(index).locator(".buy-link").click();
    }

    async checkEmptySearchResultIsPresent(){
        await expect(this.emptyResultMessage).toHaveText("Мы ничего не нашли по вашему запросу! Что делать?")
    }
}
