import { Document, Schema, Model, model } from 'mongoose'
import { EmployeeInterface } from '../interfaces/EmployeeInterface'

export interface EmployeeModel extends EmployeeInterface, Document {
}

const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  idEmp: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
})

export const Employee: Model<EmployeeModel> = model<EmployeeModel>('Employee', EmployeeSchema)