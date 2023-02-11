import { App } from "../src/app/App"
import request from 'supertest'
import mongoose from "mongoose"
import { Contract } from '../src/app/models/Contract'

const app = new App().express
const contractObj = new Contract()

describe('Contract Create Test', () => {
  
  test('Success', async () => {
    const response = await request(app)
    .post('/contract/create')
    .send({
      house: "63e23653d136f313883a5eb1",
      client: "63e23649d136f313883a5eaa",
      expiration: "2024-01-01"
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('_id')
    expect(response.body).toHaveProperty('client')
    expect(response.body).toHaveProperty('house')
    expect(response.body).toHaveProperty('expiration')
    expect(response.body).toHaveProperty('start')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('updatedAt')
  })

  test('Internal Server Error', async () => {
    const response = await request(app)
    .post('/contract/create')
    .send({
      house: "63e23653d136f313883a5eb1",
      client: "63e23649d136f313883a5eaa",
    })

    expect(response.status).toBe(500)
    expect(response.body).toBe('OK')
  })
  
})

describe('Contract Client List Test', () => {
  const clientId = '63e23649d136f313883a5eaa'

  test('Success', async () => {
    const response = await request(app)
    .get(`/contract/${clientId}/client/list`)

    expect(response.status).toBe(200)
  })
  
})

describe('Contract House List Test', () => {
  const houseId = '63e23653d136f313883a5eb1'

  test('Success', async () => {
    const response = await request(app)
    .get(`/contract/${houseId}/house/list`)

    expect(response.status).toBe(200)
  })
  
})


describe('Contract Read Test', () => {
  
  test('Success', async () => {
    const response = await request(app)
    .get('/contract/read')

    expect(response.status).toBe(200)
  })
  
})

describe('Contract Update Test', () => {

  const contractId = '63e23660d136f313883a5ec0'

  test('Success', async () => {
    const response = await request(app)
    .put(`/contract/${contractId}/update`)
    .send({
      expiration: "2030-01-01"
    })

    expect(response.status).toBe(200)
  })

  test('Not found', async () => {
    const response = await request(app)
    .put(`/contract/63e23653d136f313883a5eb3/update`)
    .send({
      expiration: "2030-01-01"
    })

    expect(response.status).toBe(404)
    expect(response.body).toBe('OK')
  })

  test('Internal Server Error', async () => {
    const response = await request(app)
    .put('/contract/63e1f7c2a14df5ec61fa819b09/update')
    .send({
      expiration: "2030-01-01"
    })

    expect(response.status).toBe(500)
    expect(response.body).toBe('OK')
  })
  
})

describe('Contract Delete Test', () => {
  
  test('Success', async () => {
    const result = await contractObj.getAllContracts()
    const lastContract = result[result.length - 1]  
    const contractId = lastContract._id

    const response = await request(app)
    .delete(`/contract/${contractId}/delete`)

    expect(response.status).toBe(200)
  })

  test('Not found', async () => {
    const response = await request(app)
    .delete(`/contract/63e23653d136f313883a5eb3/delete`)  

    expect(response.status).toBe(404)
    expect(response.body).toBe('OK')
  })

  test('Internal Server Error', async () => {
    const response = await request(app)
    .delete('/contract/63e1f7c2a14df5ec61fa819b09/delete')

    expect(response.status).toBe(500)
    expect(response.body).toBe('OK')
  })
  
})

afterAll(() => mongoose.disconnect())
