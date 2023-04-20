import { expect, Page, Locator } from '@playwright/test';

interface TrimPanel {
    readonly performance: Locator;
    readonly longRange: Locator;
    readonly modelY: Locator;
  }

class TeslaPage {
    readonly inventoryTitle: Locator;
    readonly inventoryURLRegex: RegExp;
    readonly page: Page;
    readonly result: TrimPanel;
    readonly sideHeader: Locator;
    readonly trimPanel: TrimPanel;
    readonly viewInventoryButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.inventoryTitle = page.getByLabel('Inventory', {exact: true});
        this.inventoryURLRegex = /.*inventory\/new\/.*/;
        this.result = {
            performance: page.locator('section').filter({ hasText: '2023 Model YModel Y Performance Dual Motor All-Wheel Drive396 mile odometerBay A' }),
            longRange: page.locator('section').filter({ hasText: '2023 Model YModel Y Long Range Dual Motor All-Wheel Drive755 mile odometerBay Ar' }),
            modelY: page.getByText('2023 Model YModel Y All-Wheel DriveBay Area$46,990Est. Loan Payment$720 /mo$4,50')
        },
        this.sideHeader = page.getByRole('complementary');
        this.trimPanel = {
            performance: page.getByText('Performance All-Wheel Drive'),
            longRange: page.getByText('Long Range All-Wheel Drive'),
            modelY: page.getByText('Model Y All-Wheel Drive')
        }
        this.viewInventoryButton = page.getByRole('link', { name: 'View Inventory' });
    }

    async clickViewInventory(){
        await this.viewInventoryButton.click();
    }

    async clickTrimOption(option: string){
        await this.trimPanel[option].check();
    }

    async checkInventoryPageLoaded(){
        await expect(this.page).toHaveURL(this.inventoryURLRegex);
        expect(this.inventoryTitle).toBeVisible;
        expect(this.sideHeader).toBeVisible;
    }
    
    async checkResultsUpdated(option: string){
        expect(this.result[option]).toBeVisible;
    }


}

export default TeslaPage;