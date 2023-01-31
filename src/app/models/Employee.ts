import { Document, Schema, Model, model,  } from 'mongoose'
import { EmployeeInterface } from '../interfaces/EmployeeInterface'

export interface EmployeeModel extends EmployeeInterface, Document {
  create(employee: any): Promise<any>,
  isRegistered(id: string | null, email: string | null): Promise<boolean>,
  getAllEmployees(): Promise<any>,
  updateEmployeeById(id: string, employee: any): Promise<any>
  deleteEmployeeById(id: string): Promise<any>
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
    required: true,
    lowercase: true
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

// methods
EmployeeSchema.methods.create = async function(employee: any): Promise<any>{
  return await model('Employee').create(employee);
};

EmployeeSchema.methods.isRegistered = async function(id: string | null, email: string | null): Promise<boolean>{
  let result = null

  if(id && !email)
    result = await model('Employee').find({ _id: id });
  else if(!id && email)
    result = await model('Employee').find({ email });
  else
    throw { message: 'Invalid param', status: 500 }
  
  if(result && result.length)
    return true
  
  return false
};

EmployeeSchema.methods.getAllEmployees = async function(): Promise<any>{
  const result = await model('Employee').find();
  return result
};

EmployeeSchema.methods.updateEmployeeById = async function(id: string, employee: any): Promise<any>{
  const result = await model('Employee').findByIdAndUpdate(id, employee, {new: true});
  return result
};

EmployeeSchema.methods.deleteEmployeeById = async function(id: string): Promise<any>{
  const result = await model('Employee').findByIdAndDelete(id);
  return result
};

export const Employee: Model<EmployeeModel> = model<EmployeeModel>('Employee', EmployeeSchema)