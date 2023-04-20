import { test, expect } from '@playwright/test';
import TeslaPage from '../pages/tesla.page';

// Example using Page Object Models (POM) and Behavior Driven Development (BDD)

const URL = 'https://www.tesla.com/';
let teslaPage: TeslaPage;


test.beforeEach(async ({ page }) => {
    teslaPage = new TeslaPage(page);
    await page.goto(URL);
});

test.describe('Given Im on the Home Page', () => {
    
    test('When I click at View Inventory Then it displays the inventory page', async ({ page }) => {
        //Arrange
        // no need since we are using Page Objects Model

        //Act

        await teslaPage.clickViewInventory();

        //Assert
        await teslaPage.checkInventoryPageLoaded();
      });
});