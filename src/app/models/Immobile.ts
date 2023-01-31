import { Document, Schema, Model, model } from 'mongoose'
import { ImmobileInterface } from '../interfaces/ImmobileInterface'

export interface ImmobileModel extends ImmobileInterface, Document {
}

const ImmobileSchema = new Schema({
  idImmo: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  rentValue: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

export const Client: Model<ImmobileModel> = model<ImmobileModel>('Immobile', ImmobileSchema)