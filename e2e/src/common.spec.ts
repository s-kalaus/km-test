import { test, expect } from '@playwright/test';
import { movies } from '~/mocks/data/movies';

const [movie] = movies;

test('open home page with 5 movies', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('[role="movie"]');

  expect(await page.locator('[role="movie"]').count()).toBe(5);
});

test('open movie detail page', async ({ page }) => {
  await page.goto('/');

  const firstMovie = await page.waitForSelector('[role="movie"]');
  await firstMovie.click();

  const movieDetails = await page.waitForSelector('[role="main"]');

  expect(await movieDetails.innerText()).toContain(movie.title);
});

test('add and remove from favorites', async ({ page }) => {
  await page.goto('/');

  await page.waitForSelector('[role="movie"]');
  await page.locator('[aria-label="favorite"]').first().click();
  await page.goto('/favorites');

  const firstMovie = await page.waitForSelector('[role="movie"]');

  expect(await firstMovie.innerText()).toContain(movie.title);
});
