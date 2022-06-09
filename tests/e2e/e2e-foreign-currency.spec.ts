import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { Navbar } from '../../page-objects/components/Navbar'
import { ForeignCurrencyPage } from '../../page-objects/ForeignCurrencyPage'

test.describe.parallel("Purchase Foreign Currency", () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let navbar: Navbar
    let foreignCurrencyPage: ForeignCurrencyPage
    //Login
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        navbar = new Navbar(page)
        foreignCurrencyPage = new ForeignCurrencyPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
         await loginPage.login('username', 'password')
        await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html')
    })

    test("Should purchase foreign currency in Canadian dollars", async ({ page }) => {
        await navbar.clickOnTab('Pay Bills')
        await foreignCurrencyPage.purchaseCanadianDollars()
        await foreignCurrencyPage.successMessage()
    })
    test("Should purchase foreign currency in US dollars", async ({ page }) => {
        await navbar.clickOnTab('Pay Bills')
        await foreignCurrencyPage.purchaseUSD()
        await foreignCurrencyPage.successMessage()
    })
})