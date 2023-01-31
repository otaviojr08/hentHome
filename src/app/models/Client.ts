import { Document, Schema, Model, model } from 'mongoose'
import { ClientInterface } from '../interfaces/ClientInterface'

export interface ClientModel extends ClientInterface, Document {
  create(client: any): Promise<any>,
  isRegistered(id: string | null, cpf: string | null): Promise<boolean>,
  getAllClients(): Promise<any>,
  updateClientById(id: string, employee: any): Promise<any>
  deleteClientById(id: string): Promise<any>
}

const ClientSchema = new Schema({
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
  idCli: {
    type: String,
    required: true
  },
  creditCard: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

// methods
ClientSchema.methods.create = async function(employee: any): Promise<any>{
  return await model('Client').create(employee);
};

ClientSchema.methods.isRegistered = async function(id: string | null, cpf: string | null): Promise<boolean>{
  let result = null

  if(id && !cpf){
    result = await model('Client').find({ _id: id });
 } else if(!id && cpf)
    result = await model('Client').find({ cpf });
  else
    throw { message: 'Invalid param', status: 500 }
  
  if(result && result.length)
    return true
  
  return false
};

ClientSchema.methods.getAllClients = async function(): Promise<any>{
  const result = await model('Client').find();
  return result
};

ClientSchema.methods.updateClientById = async function(id: string, client: any): Promise<any>{
  const result = await model('Client').findByIdAndUpdate(id, client, {new: true});
  return result
};

ClientSchema.methods.deleteClientById = async function(id: string): Promise<any>{
  const result = await model('Client').findByIdAndDelete(id);
  return result
};

export const Client: Model<ClientModel> = model<ClientModel>('Client', ClientSchema)