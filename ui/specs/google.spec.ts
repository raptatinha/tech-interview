import { test, expect } from '@playwright/test';

//Example for a valid and an invalid scenario


const validTerm = 'Tesla Model X';
const inValidTerm = '\"Teslaasdsadqwe2edaswfdry Mo32323ewrwede23423423l Xsdjkwjuro384u823\"';
const resultsMessageRegex = /About .* results/;
// https://regexr.com/
const noResultsMessage = 'Your search did not match any documents';


test.beforeEach(async ({ page }) => {
    await page.goto('https://google.com'); //this could also be defined on the playwright.config.ts file if we had all tests running against the same URL
});

test.describe('Search', () => {
    
    test('should display results', async ({ page }) => {
        const searchField = page.getByLabel('Search', {exact: true});
        // A few other locator examples:
        // const searchButton = page.getByRole('input', { name: 'Search' });
        // const searchButton = page.locator(`[aria-label="Search"]`});
        // const searchButton = page.locator('[name='q']');
        const resultsLabel = page.getByText(resultsMessageRegex);
        
        await searchField.fill(validTerm);
        await searchField.press('Enter');
        expect(resultsLabel).toBeVisible;
});

test('should not display results', async ({ page }) => {
    //Arrange
    const searchField = page.getByLabel('Search', {exact: true});
    const resultsLabel = page.getByText(resultsMessageRegex);
    const noResultsLabel = page.getByText(noResultsMessage);
    
    //Act
    await searchField.fill(inValidTerm);
    await searchField.press('Enter');

    //Assert
    expect(resultsLabel).toBeVisible;
    expect(noResultsLabel).toBeVisible;
});

});