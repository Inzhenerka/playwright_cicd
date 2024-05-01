import { test as base } from "@playwright/test";
import { Company } from "../types/company";

const host = "https://x-clients-be.onrender.com";
const auth = "/auth/login";
const company = "/company";

type MyFixtureType = {
  token: string;
  company: Company;
};

export const test = base.extend<MyFixtureType>({
  company: async ({ request }, use) => {
    const companyInfo: Company = {
      id: 0, // id пока не знаем
      isActive: true, // по умолчанию на сервере ставится true
      name: "Инженерка",
      description: "курсы для инженеров от инженеров.",
    };

    const createCompanyResponse = await request.post(host + company, {
      headers: { "x-client-token": await getToken(request) },
      data: { name: companyInfo.name, description: companyInfo.description },
    });

    const body = await createCompanyResponse.json();
    companyInfo.id = body["id"];
    use(companyInfo);
  },

  token: async ({ request }, use) => {
    use(await getToken(request));
  },
});

async function getToken(request): Promise<string> {
  const loginData = {
    username: "leonardo",
    password: "leads",
  };

  const authResponse = await request.post(host + auth, { data: loginData });
  const authBody = await authResponse.json();
  return authBody["userToken"];
}

