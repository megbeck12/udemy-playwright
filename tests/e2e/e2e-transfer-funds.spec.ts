import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { TransferFundsPage } from '../../page-objects/TransferFundsPage'
import { Navbar } from '../../page-objects/components/Navbar'

test.describe("Transfer funds and make payments", () => {
    let homePage: HomePage
        let loginPage: LoginPage
        let transferFundsPage: TransferFundsPage
        let navbar: Navbar

    test.beforeEach(async ({ page }) => {

        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        transferFundsPage = new TransferFundsPage(page)
        navbar = new Navbar(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')

        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    })

    test("Transfer funds", async ({ page }) => {
        await navbar.clickOnTab('Transfer Funds')
        await transferFundsPage.transferPayment()
        await transferFundsPage.confirmPayment()
        await transferFundsPage.assertSuccessMessage()
    })
})