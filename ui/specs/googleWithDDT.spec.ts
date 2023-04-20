import { test, expect } from '@playwright/test';
import terms from '../data/term';

// Example using Data Driven Test (DDT) and Arrange Act Assert (AAA)
// In this case, we have "terms" which is our data file and we can iterate on it to test multiple scenarios with the same code

const URL = 'https://www.google.com/';

//this is an example of when you could use a beforeAll function
test.beforeAll(async ({playwright}) => {
    //db clean up
    //db seed
    //environment setup
    //load the sign in state
    // await playwright.request.newContext({ storageState: 'storageState.json' });
});

test.beforeEach( async ({page}) => {
    await page.goto(URL);
});

test.describe('Search', () => {

    for(const term of terms.valid) {

        test(`Valid term "${term}"`, async ({page}) => {
            //AAA
            //Arrange
            const searchField = page.getByLabel('Search', {exact: true});
            const resultsMessageRegex = /About .* results/;
            const resultsLabel = page.getByText(resultsMessageRegex);
    
            //Act
            await searchField.fill(term);
            await searchField.press('Enter');
    
            //Assert
            expect(resultsLabel).toBeVisible;
    
        })
    }
})