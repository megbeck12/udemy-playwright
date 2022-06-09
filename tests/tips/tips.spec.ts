import { test, expect } from '@playwright/test'
import { getRandomNumber } from '../../utils/data-helpers'
import { getRandomString } from '../../utils/data-helpers'

test.describe('Tips and tricks section', () => {
    test.only('TestInfo Object', async ({ page }, testInfo)  => {
        await page.goto('https://www.example.com')
        let newNumber = await getRandomNumber()
        let newString = await getRandomString()
        console.log(newString)
    })

    test('Test skip browser', async ({ page, browserName }) => {
        test.skip(browserName === 'chromium', 'Feature not ready in chrome browser')
        await page.goto('https://www.example.com')
    })

    test('Test Fixme annotation', async ({ page, browserName }) => {
        //test.fixme(browserName === 'chromium', 'Test is not stable, needs revision')
        await page.goto('https://www.example.com')
    })

    const people = ['Mike', 'Judy', 'Peter', 'Elon', 'Alice']
    for(const name of people) {
        test(`Running test for ${name}`, async ({ page }) => {
            await page.goto('http://zero.webappsecurity.com/index.html')
            await page.type('#searchTerm', `${name}`)
            await page.waitForTimeout(3000)
        })
    }

    test('Mouse Movement simulation', async ({ page }) => {
        await page.goto('https://www.example.com')
        await page.mouse.move(0, 0)
        await page.mouse.down()
        await page.mouse.move(0, 100)
        await page.mouse.up()
    })

    test('Multiple browser tabs inside one browser', async ({ browser }) => {
        const context = await browser.newContext()
        const pageOne = await context.newPage()
        const pageTwo = await context.newPage()
        const pageThree = await context.newPage()
        await pageOne.goto('https://www.example.com')
        await pageTwo.goto('https://www.example.com')
        await pageThree.goto('https://www.example.com')
        await pageOne.waitForTimeout(6000)
    })
})