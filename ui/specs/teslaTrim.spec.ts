import { test, expect } from '@playwright/test';
import TeslaPage from '../pages/tesla.page';

// Example using Page Object Models (POM) and Behavior Driven Development (BDD)

const URL = 'https://www.tesla.com/';
let teslaPage: TeslaPage;


test.beforeEach(async ({ page }) => {
    teslaPage = new TeslaPage(page);
    await page.goto(URL);
});

test.describe('Given Im on the Inventory Page', () => {
    
    test('When I click at Performance All-Wheel DriveThen it filters the results', async ({ page }) => {
        //Arrange
        const trimOption = 'performance';
        // const trimOption = 'longRange';
        // const trimOption = 'modelY';

        //Act
        await teslaPage.clickViewInventory();
        await teslaPage.checkInventoryPageLoaded();
        await teslaPage.clickTrimOption(trimOption);

        //Assert
        await teslaPage.checkResultsUpdated(trimOption);

      });

      
        
});
