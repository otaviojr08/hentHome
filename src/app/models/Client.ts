import { Document, Schema, Model, model } from 'mongoose'
import { ClientInterface } from '../interfaces/ClientInterface'

export interface ClientModel extends ClientInterface, Document {
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

export const Client: Model<ClientModel> = model<ClientModel>('Client', ClientSchema)