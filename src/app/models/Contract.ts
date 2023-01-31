import { Document, Schema, Model, model } from 'mongoose'
import { ContractInterface } from '../interfaces/ContractInterface'

export interface ContractModel extends ContractInterface, Document {
}

const ContractSchema = new Schema({
  idCont: {
    type: String,
    required: true
  },
  idCli: {
    type: String,
    required: true
  },
  idImmo: {
    type: String,
    required: true
  },
  expiration: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
})

export const Client: Model<ContractModel> = model<ContractModel>('Contract', ContractSchema)