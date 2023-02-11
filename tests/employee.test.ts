import { App } from "../src/app/App"
import request from 'supertest'
import mongoose from "mongoose"
import { Employee } from '../src/app/models/Employee'

const app = new App().express
const employeeObj = new Employee()

describe('Employee Create Test', () => {
  
  const generatedCpf = `00000000000`

  test('Success', async () => {
    const response = await request(app)
    .post('/employee/create')
    .send({
      name: "Otávio Júnior",
      birthday: "2023-01-01",
      cpf: generatedCpf,
      email: "otavio@otavio",
      phone: "000000000",
      password: "123456",
      isAdmin: false
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('_id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('birthday')
    expect(response.body).toHaveProperty('cpf')
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('phone')
    expect(response.body).toHaveProperty('isAdmin')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('updatedAt')
  })

  test('Employee already registered', async () => {
    const response = await request(app)
    .post('/employee/create')
    .send({
      name: "Otávio Júnior",
      birthday: "2023-01-01",
      cpf: generatedCpf,
      email: "otavio@otavio",
      phone: "000000000",
      password: "123456",
      isAdmin: false
    })

    expect(response.status).toBe(400)
    expect(response.body).toBe('OK')
  })

  test('Internal Server Error', async () => {
    const response = await request(app)
    .post('/employee/create')
    .send({
      name: "Otávio Júnior",
      birthday: "2023-01-01",
      cpf: generatedCpf,
      phone: "000000000",
      password: "123456",
      isAdmin: false
    })

    expect(response.status).toBe(500)
    expect(response.body).toBe('OK')
  })
  
})

describe('Employee Read Test', () => {
  
  test('Success', async () => {
    const response = await request(app)
    .get('/employee/read')

    expect(response.status).toBe(200)
  })
  
})

describe('Employee Update Test', () => {

  const employeeId = '63e2083663b7ccee3e49f1b8'

  test('Success', async () => {
    const response = await request(app)
    .put(`/employee/${employeeId}/update`)
    .send({
      name: "Admin",
      birthday: "2023-01-01",
      cpf: "000000000-00",
      email: "admin@admin",
      phone: "000000000",
      password: "123456",
      isAdmin: true
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('_id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('birthday')
    expect(response.body).toHaveProperty('cpf')
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('phone')
    expect(response.body).toHaveProperty('isAdmin')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('updatedAt')
  })

  test('Not found', async () => {
    const response = await request(app)
    .put(`/employee/63e23653d136f313883a5eb3/update`)
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
    .put('/employee/63e1f7c2a14df5ec61fa819b09/update')
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

describe('Employee Delete Test', () => {
  
  test('Success', async () => {
    const result = await employeeObj.getAllEmployees()
    const lastEmployee = result[result.length - 1]  
    const employeeId = lastEmployee._id

    const response = await request(app)
    .delete(`/employee/${employeeId}/delete`)

    expect(response.status).toBe(200)
  })

  test('Not found', async () => {
    const response = await request(app)
    .delete(`/employee/63e23653d136f313883a5eb3/delete`)  

    expect(response.status).toBe(404)
    expect(response.body).toBe('OK')
  })

  test('Internal Server Error', async () => {
    const response = await request(app)
    .delete('/employee/63e1f7c2a14df5ec61fa819b09/delete')

    expect(response.status).toBe(500)
    expect(response.body).toBe('OK')
  })
  
})

afterAll(() => mongoose.disconnect())
