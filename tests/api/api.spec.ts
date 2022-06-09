import { test, expect } from '@playwright/test'

test.describe.parallel('Api testing', () => {
    const baseUrl = 'https://reqres.in/api'

    test('Simple api test - Assert response status', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
    })

    test('Simple api test - Assert invalid endpoint', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/invalid-endpoint`)
        expect(response.status()).toBe(404)
    })

    test('GET request - Get user detail', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/4`)
        const responseBody = JSON.parse(await response.text())

        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(4)
        expect(responseBody.data.first_name).toBe('Eve')
        expect(responseBody.data.last_name).toBe('Holt')
        expect(responseBody.data.email).toBeTruthy()
    })

    test('POST request - Create new user', async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, {
            data:{
                id: 1000,
            },
        })
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.id).toBe(1000)
        expect(responseBody.createdAt).toBeTruthy()
    })

    test('POST request - Login', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: "eve.holt@reqres.in",
                password: "cityslicka",
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()
    })

    test('POST request - Login fail', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: "eve.holt@reqres.in",
            },
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(400)
        expect(responseBody.error).toBe("Missing password")
    })

    test('PUT request - Update user', async ({ request }) => {
        const response = await request.put(`${baseUrl}/users/4`, {
            data: {
                name: "Helen",
                job: "new job",
            },
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe('Helen')
        expect(responseBody.job).toBe('new job')
        expect(responseBody.updatedAt).toBeTruthy()
    })

    test('DELETE request - Delete user', async ({ request }) => {
        const response = await request.delete(`${baseUrl}/users/4`)
        expect(response.status()).toBe(204)
    })
})