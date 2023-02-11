import { App } from "../src/app/App"
import request from 'supertest'
import mongoose from "mongoose"

const app = new App().express
const url = `/auth`

describe('Auth Test', () => {
  
  test('Success', async () => {
    const response = await request(app)
    .post('/auth')
    .send({
      "email": "admin@admin",
      "password": "123456"
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body).toHaveProperty('isAdmin')
  })

  test('Not found', async () => {
    const response = await request(app)
    .post(url)
    .send({
      email: "notFound@notFound",
      password: "123456"
    })  

    expect(response.status).toBe(404)
    expect(response.body).toBe('OK')
  })
  

  test('Unauthozatid', async () => {
    const response = await request(app)
    .post(url)
    .send({
      email: "admin@admin",
      password: "00000"
    })

    expect(response.status).toBe(401)
    expect(response.body).toBe('OK')
  })

  test('Internal Server Error', async () => {
    const response = await request(app)
    .post(url)
    .send({})

    expect(response.status).toBe(500)
    expect(response.body).toBe('OK')
  })

})

afterAll(() => mongoose.disconnect())


