import { APIRequestContext, expect, test } from "@playwright/test";

const host = "https://x-clients-be.onrender.com";
const auth = "/auth/login";
const company = "/company";
const deleteCompany = "/delete";

test("Информация о компании", async ({ request }) => {
  const companyInfo = await crateCompany(
    request,
    "ИнженеркаТех",
    "курсы для инженеров от инженеров"
  );

  const response = await request.get(`${host}${company}/${companyInfo["id"]}`);
  const body = await response.json();

  expect(response.status()).toEqual(200);
  expect(body["id"]).toStrictEqual(companyInfo.id);
  expect(body["isActive"]).toStrictEqual(companyInfo.isActive);
  expect(body["name"]).toStrictEqual(companyInfo.name);
  expect(body["description"]).toStrictEqual(companyInfo.description);
});

test("Удаление компании", async ({ request }) => {
  const companyInfo = await crateCompany(
    request,
    "ИнженеркаТех",
    "курсы для инженеров от инженеров"
  );
  const token = await getToken(request);

  const response = await request.get(
    `${host}${company}${deleteCompany}/${companyInfo["id"]}`,
    { headers: { "x-client-token": token }}
  );
  const body = await response.json();

  expect(response.status()).toEqual(200);
  expect(body["id"]).toStrictEqual(companyInfo.id);
  expect(body["isActive"]).toStrictEqual(companyInfo.isActive);
  expect(body["name"]).toStrictEqual(companyInfo.name);
  expect(body["description"]).toStrictEqual(companyInfo.description);
});

test("Редактирование компании", async ({ request }) => {
  const companyInfo = await crateCompany(
    request,
    "ИнженеркаТех",
    "курсы для инженеров от инженеров"
  );
  const token = await getToken(request);

  const updatedInfo = {
    description: `Лучшие ${companyInfo.description}`
  }
  
  const response = await request.patch(
    `${host}${company}/${companyInfo["id"]}`,
    { headers: { "x-client-token": token }, data: updatedInfo}
  );
  const body = await response.json();

  expect(response.status()).toEqual(200);
  expect(body["id"]).toStrictEqual(companyInfo.id);
  expect(body["isActive"]).toStrictEqual(companyInfo.isActive);
  expect(body["name"]).toStrictEqual(companyInfo.name);
  expect(body["description"]).toStrictEqual( `Лучшие ${companyInfo.description}`);
});

async function crateCompany(
  request: APIRequestContext,
  name: string,
  description: string
) {
  const companyInfo = { name: name, description: description };
  const token = await getToken(request);
  const createCompanyResponse = await request.post(host + company, {
    headers: { "x-client-token": token },
    data: companyInfo,
  });

  const body = await createCompanyResponse.json();

  companyInfo["id"] = body["id"];
  companyInfo["isActive"] = true; // по умолчанию на сервере ставится true
  return companyInfo;
}

async function getToken(request: APIRequestContext) {
  const loginData = {
    username: "leonardo",
    password: "leads",
  };

  const authResponse = await request.post(host + auth, { data: loginData });
  const authBody = await authResponse.json();
  return authBody["userToken"];
}
