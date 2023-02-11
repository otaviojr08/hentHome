import { App } from "../src/app/App"
import request from 'supertest'
import mongoose from "mongoose"
import { House } from '../src/app/models/House'

const app = new App().express
const houseObj = new House()

describe('House Create Test', () => {
  
  test('Success', async () => {
    const response = await request(app)
    .post('/house/create')
    .send({
      address: "Lavras-MG",
      rentValue: 1200
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('_id')
    expect(response.body).toHaveProperty('address')
    expect(response.body).toHaveProperty('rentValue')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('updatedAt')
  })

  test('Internal Server Error', async () => {
    const response = await request(app)
    .post('/house/create')
    .send({
      "rentValue": 1200
    }) 

    expect(response.status).toBe(500)
    expect(response.body).toBe('OK')
  })
  
})

describe('House Read Test', () => {
  
  test('Success', async () => {
    const response = await request(app)
    .get('/house/read')

    expect(response.status).toBe(200)
  })
  
})

describe('House Update Test', () => {

  const houseId = '63e23653d136f313883a5eb1'

  test('Success', async () => {
    const response = await request(app)
    .put(`/house/${houseId}/update`)
    .send({
      address: "Divinópolis - MG",
      rentValue: 1200
    })

    expect(response.status).toBe(200)
  })

  test('Not found', async () => {
    const response = await request(app)
    .put(`/house/63e23653d136f313883a5eb3/update`)
    .send({
      address: "Lavras - MG",
      rentValue: 1200
    })  

    expect(response.status).toBe(404)
    expect(response.body).toBe('OK')
  })

  test('Internal Server Error', async () => {
    const response = await request(app)
    .put('/house/63e1f7c2a14df5ec61fa819b09/update')
    .send({
      address: "Lavras - MG",
      rentValue: 1200
    }) 

    expect(response.status).toBe(500)
    expect(response.body).toBe('OK')
  })
  
})

describe('House Delete Test', () => {
  
  test('Success', async () => {
    const result = await houseObj.getAllHouses()
    const lastHouse = result[result.length - 1]  
    const houseId = lastHouse._id

    const response = await request(app)
    .delete(`/house/${houseId}/delete`)

    expect(response.status).toBe(200)
  })

  test('Not found', async () => {
    const response = await request(app)
    .delete(`/house/63e23653d136f313883a5eb3/delete`)  

    expect(response.status).toBe(404)
    expect(response.body).toBe('OK')
  })

  test('Internal Server Error', async () => {
    const response = await request(app)
    .delete('/house/63e1f7c2a14df5ec61fa819b09/delete')

    expect(response.status).toBe(500)
    expect(response.body).toBe('OK')
  })
  
})

afterAll(() => mongoose.disconnect())
