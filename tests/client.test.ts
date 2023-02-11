import { App } from "../src/app/App"
import request from 'supertest'
import mongoose from "mongoose"
import { Client } from '../src/app/models/Client'

const app = new App().express
const clientObj = new Client()

describe('Client Create Test', () => {
  
  const generatedCpf = `00000000000`

  test('Success', async () => {
    const response = await request(app)
    .post('/client/create')
    .send({
      name: "Júnior",
      birthday: "2020-12-15",
      cpf: generatedCpf,
      email: "otavio@otavio",
      phone: "998612409",
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('_id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('birthday')
    expect(response.body).toHaveProperty('cpf')
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('phone')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('updatedAt')
  })

  test('Client already registered', async () => {
    const response = await request(app)
    .post('/client/create')
    .send({
      name: "Júnior",
      birthday: "2020-12-15",
      cpf: generatedCpf,
      email: "otavio@otavio",
      phone: "998612409",
    })

    expect(response.status).toBe(400)
    expect(response.body).toBe('OK')
  })

  test('Internal Server Error', async () => {
    const response = await request(app)
    .post('/client/create')
    .send({
      name: "Júnior",
      birthday: "2020-12-15",
      email: "otavio@otavio",
      phone: "998612409",
    })

    expect(response.status).toBe(500)
    expect(response.body).toBe('OK')
  })
  
})

describe('Client Read Test', () => {
  
  test('Success', async () => {
    const response = await request(app)
    .get('/client/read')

    expect(response.status).toBe(200)
  })
  
})

describe('Client Update Test', () => {

  const clientId = '63e23649d136f313883a5eaa'

  test('Success', async () => {
    const response = await request(app)
    .put(`/client/${clientId}/update`)
    .send({
      "name": "Otávio",
      "birthday": "2023-02-11",
      "cpf": "000000000-00",
      "email": "otavio@otavio",
      "phone": "11111111",
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('_id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('birthday')
    expect(response.body).toHaveProperty('cpf')
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('phone')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('updatedAt')
  })

  test('Not found', async () => {
    const response = await request(app)
    .put(`/client/63e23653d136f313883a5eb3/update`)
    .send({
      "name": "Otávio",
      "birthday": "2023-02-11",
      "cpf": "000000000-00",
      "email": "otavio@otavio",
      "phone": "11111111",
    }) 

    expect(response.status).toBe(404)
    expect(response.body).toBe('OK')
  })

  test('Internal Server Error', async () => {
    const response = await request(app)
    .put('/client/63e1f7c2a14df5ec61fa819b09/update')
    .send({
      "name": "Otávio",
      "birthday": "2023-02-11",
      "cpf": "000000000-00",
      "email": "otavio@otavio",
      "phone": "11111111",
    })

    expect(response.status).toBe(500)
    expect(response.body).toBe('OK')
  })
  
})

describe('Client Delete Test', () => {
  
  test('Success', async () => {
    const result = await clientObj.getAllClients()
    const lastClient = result[result.length - 1]  
    const clientId = lastClient._id

    const response = await request(app)
    .delete(`/client/${clientId}/delete`)

    expect(response.status).toBe(200)
  })

  test('Not found', async () => {
    const response = await request(app)
    .delete(`/client/63e23653d136f313883a5eb3/delete`)  

    expect(response.status).toBe(404)
    expect(response.body).toBe('OK')
  })

  test('Internal Server Error', async () => {
    const response = await request(app)
    .delete('/client/63e1f7c2a14df5ec61fa819b09/delete')

    expect(response.status).toBe(500)
    expect(response.body).toBe('OK')
  })
  
})

afterAll(() => mongoose.disconnect())
