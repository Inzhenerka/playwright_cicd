// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { testPlanFilter } from "allure-playwright/dist/testplan";

export default defineConfig({
  grep: testPlanFilter(),
  reporter: [["allure-playwright"]],
  
  testDir: './tests',
  fullyParallel: true,
  use: {
    trace: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

});

