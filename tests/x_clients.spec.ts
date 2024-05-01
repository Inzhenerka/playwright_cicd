import { expect } from "@playwright/test";
import { test } from "../fixtures/x_clients.fixture";

const host = "https://x-clients-be.onrender.com";
const companyPath = "/company";
const deleteCompany = "/delete";

test("Информация о компании", async ({ request, company }) => {
  const response = await request.get(`${host}${companyPath}/${company.id}`);

  expect(response.status()).toEqual(200);
  expect(await response.json()).toMatchObject(company);
});

test("Удаление компании", async ({ request, company, token }) => {
  const response = await request.get(
    `${host}${companyPath}${deleteCompany}/${company.id}`,
    { headers: { "x-client-token": token } }
  );
  
  expect(response.status()).toEqual(200);
  expect(await response.json()).toMatchObject(company);
});

test("Редактирование компании", async ({ request, company, token }) => {
  company.description = `Лучшие ${company.description}`

  const response = await request.patch(`${host}${companyPath}/${company.id}`, {
    headers: { "x-client-token": token },
    data: {description: company.description}
  });

  expect(response.status()).toEqual(200);
  expect(await response.json()).toMatchObject(company);
});

