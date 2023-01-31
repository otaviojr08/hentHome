import { Document, Schema, Model, model } from 'mongoose'
import { HouseInterface } from '../interfaces/HouseInterface'

export interface HouseModel extends HouseInterface, Document {
}

const HouseSchema = new Schema({
  idHouse: {
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

export const Client: Model<HouseModel> = model<HouseModel>('House', HouseSchema)