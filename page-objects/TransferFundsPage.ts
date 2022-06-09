import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class TransferFundsPage extends AbstractPage{
    readonly fromAccountBox: Locator
    readonly toAccountBox: Locator
    readonly amountBox: Locator
    readonly descriptionBox: Locator
    readonly submitButton: Locator
    readonly confirmHeader: Locator
    readonly message: Locator
    
    constructor(page: Page) {
        super(page)
        this.fromAccountBox = page.locator('#tf_fromAccountId')
        this.toAccountBox = page.locator('#tf_toAccountId')
        this.amountBox = page.locator('#tf_amount')
        this.descriptionBox = page.locator('#tf_description')
        this.submitButton = page.locator('#btn_submit')
        this.confirmHeader = page.locator('h2.board-header')
        this.message = page.locator('.alert-success')
    }

    async transferPayment() {
        await this.fromAccountBox.selectOption('2')
        await this.toAccountBox.selectOption('3')
        await this.amountBox.type('500')
        await this.descriptionBox.type('This is the best description ever')
        await this.submitButton.click()
    }

    async confirmPayment() {
        await expect(this.confirmHeader).toBeVisible()
        await this.submitButton.click()
    }

    async assertSuccessMessage() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText('You successfully submitted your transaction')
    }
}