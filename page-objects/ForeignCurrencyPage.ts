import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class ForeignCurrencyPage extends AbstractPage{
    readonly foreignCurrencyTab: Locator
    readonly currencySelect: Locator
    readonly currencySellRate: Locator
    readonly currencyAmount: Locator
    readonly currencyUSDSelection: Locator
    readonly currentSelectedCurrency: Locator
    readonly calculateButton: Locator
    readonly conversionAmount: Locator
    readonly purchaseButton: Locator
    readonly message: Locator

    constructor(page: Page) {
        super(page)
        this.foreignCurrencyTab = page.locator('text=Purchase Foreign Currency')
        this.currencySelect = page.locator('#pc_currency')
        this.currencySellRate = page.locator('#sp_sell_rate')
        this.currencyAmount = page.locator('#pc_amount')
        this.currencyUSDSelection = page.locator('#pc_inDollars_false')
        this.currentSelectedCurrency = page.locator('#pc_inDollars_true')
        this.calculateButton = page.locator('#pc_calculate_costs')
        this.conversionAmount = page.locator('#pc_conversion_amount')
        this.purchaseButton = page.locator('#purchase_cash')
        this.message = page.locator('#alert_content')
    }

    async purchaseCanadianDollars() {
        await this.foreignCurrencyTab.click()
        await this.currencySelect.selectOption('CAD')
        await expect(this.currencySellRate).toBeVisible()
        await this.currencyAmount.type('500')
        await this.currentSelectedCurrency.click()
        await this.calculateButton.click()
        await expect(this.conversionAmount).toBeVisible()
        await this.purchaseButton.click()
    }

    async successMessage() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText('Foreign currency cash was successfully purchased')
    }

    async purchaseUSD() {
        await this.foreignCurrencyTab.click()
        await this.currencySelect.selectOption('CAD')
        await expect(this.currencySellRate).toBeVisible()
        await this.currencyAmount.type('500')
        await this.currencyUSDSelection.click()
        await this.calculateButton.click()
        await expect(this.conversionAmount).toBeVisible()
        await this.purchaseButton.click()
    }
}