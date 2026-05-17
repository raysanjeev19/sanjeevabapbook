import { expect, test } from "@playwright/test";

test("home page presents the premium study platform", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Crack ABAP interviews/i })).toBeVisible();
  await expect(page.getByText(/curated interview questions/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Continue Reading/i })).toBeVisible();
});

test("question reader works on mobile", async ({ page }) => {
  await page.goto("/questions/internal-tables-001");
  await expect(page.getByRole("heading", { name: /What is an internal table/i })).toBeVisible();
  await expect(page.getByRole("tab", { name: /Hinglish Master/i })).toBeVisible();
  await page.getByRole("tab", { name: /Code Walkthrough/i }).click();
  await expect(page.getByText(/SELECT matnr/i)).toBeVisible();
});
