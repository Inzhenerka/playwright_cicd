import {expect, request, test} from "@playwright/test";
import fs from "fs";

test("Поиск по сайту", async ({request}) => {

  const response = await request.get("https://todo-app-sky.herokuapp.com");
  
  const status = response.status()
  const body = await response.json();

  console.log(status)
  console.log(body)
});

  test("download", async ({request}) => {
    const response = await request.get("https://www.datocms-assets.com/19381/1580306481-the-ultimate-css-selectors-cheatsheet.pdf");
    const body = await response.body()
    fs.writeFileSync("selectors.pdf", body);
  })

  test("save html", async ({request}) => {
    const response = await request.get("https://google.com/search?q=playwright");
    const body = await response.text()
    
    expect(response.status()).toEqual(200);

    fs.writeFileSync("index.html", body);
  })