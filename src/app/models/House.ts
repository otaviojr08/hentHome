import { Document, Schema, Model, model } from 'mongoose'
import { HouseInterface } from '../interfaces/HouseInterface'

export interface HouseModel extends HouseInterface, Document {
  create(house: any): Promise<any>,
  isRegistered(id: string | null, email: string | null): Promise<boolean>,
  getAllHouses(): Promise<any>,
  updateHouseById(id: string, house: any): Promise<any>
  deleteHouseById(id: string): Promise<any>
}

const HouseSchema = new Schema({
  idHouse: {
    type: String
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

// methods
HouseSchema.methods.create = async function(house: any): Promise<any>{
  return await model('House').create(house);
};

HouseSchema.methods.isRegistered = async function(id: string | null, email: string | null): Promise<boolean>{
  let result = null

  if(id && !email)
    result = await model('House').find({ _id: id });
  else if(!id && email)
    result = await model('House').find({ email });
  else
    throw { message: 'Invalid param', status: 500 }
  
  if(result && result.length)
    return true
  
  return false
};

HouseSchema.methods.getAllHouses = async function(): Promise<any>{
  const result = await model('House').find();
  return result
};

HouseSchema.methods.updateHouseById = async function(id: string, house: any): Promise<any>{
  const result = await model('House').findByIdAndUpdate(id, house, {new: true});
  return result
};

HouseSchema.methods.deleteHouseById = async function(id: string): Promise<any>{
  const result = await model('House').findByIdAndDelete(id);
  return result
};

export const House: Model<HouseModel> = model<HouseModel>('House', HouseSchema)