// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { testPlanFilter } from "allure-playwright/dist/testplan";

export default defineConfig({
  grep: testPlanFilter(),
  reporter: [["allure-playwright"], ["html"]],
  testDir: './tests',
  fullyParallel: true,
  use: {
    trace: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

});

