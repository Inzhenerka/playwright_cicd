import {expect, request, test} from "@playwright/test";

test("Поиск по сайту", async ({request}) => {

  const response = await request.get("https://todo-app-sky.herokuapp.com");
  
  const status = response.status()
  const body = await response.json();

  console.log(status)
  console.log(body)
});





test("Проверка заполнения полей", async ({request}) => {
    const todoTitle: string = "Изучить ApiRequestContext"
    const todo = {
        "title": todoTitle
    }
    const response = await request.post( "https://todo-app-sky.herokuapp.com", {data: todo});
    const body = await response.json();

    expect(body['completed']).toStrictEqual(false)
    expect(body['id']).toBeGreaterThan(0)
  });
  

test("Переименование задачи", async ({request}) => {
    // создаем задачу, которую будем редактировать
    let createBody = {
        "title": "Изучить ApiRequestContext"
    }

    let response = await request.post( "https://todo-app-sky.herokuapp.com", {data: createBody});
    let body = await response.json();
    const todoId = body.id // узнаем ее id

    // формируем и отправляем patch-запрос на редактирование
    const todoNewName: string = "Обновленное имя";
    let editBody = {
        "title": todoNewName
    }
    response = await request.patch( `https://todo-app-sky.herokuapp.com/${todoId}`, {data: editBody} )
    body = await response.body();
    
    console.log(body)
  
    // проверяем, что в ответе на запрос пришла обновленная задача
    // expect(response.ok()).toBeTruthy();
    // expect(body['title']).toEqual(todoNewName);
  });
  
  test("Отметить задачу выполненной", async ({request}) => {
    // создаем задачу, которую будем редактировать
    let createBody = {
        "title": "Изучить ApiRequestContext"
    }

    let response = await request.post( "https://todo-app-sky.herokuapp.com", {data: createBody});
    let body = await response.json();
    const todoId = body.id // узнаем ее id

    // формируем и отправляем patch-запрос на редактирование 
    let editBody = {
        "completed": true
    }
    response = await request.patch( `https://todo-app-sky.herokuapp.com/${todoId}`, {data: editBody} )
    body = await response.json();

    // проверяем, что в ответе на запрос пришла обновленная задача
    expect(response.ok()).toBeTruthy();
    expect(body['completed']).toBeTruthy();
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