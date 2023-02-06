import { Document, Schema, Model, model } from 'mongoose'
import { ContractInterface } from '../interfaces/ContractInterface'
import { House } from './House'

export interface ContractModel extends ContractInterface, Document {
  create(contract: any): Promise<any>,
  isRegistered(id: string | null, email: string | null): Promise<boolean>,
  getAllContracts(): Promise<any>,
  updateContractById(id: string, contract: any): Promise<any>,
  deleteContractById(id: string): Promise<any>,
  getClientList(id: string): Promise<any>,
  getHouseList(clientId: string): Promise<any>
}

const ContractSchema = new Schema({
  idCont: {
    type: String,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  house: {
    type: Schema.Types.ObjectId,
    ref: 'House',
    required: true
  },
  start: {
    type: Date,
    default: Date.now,
    required: true
  },
  expiration: {
    type: Date,
    required: true
  }, 
}, {
  timestamps: true
})

// methods
ContractSchema.methods.create = async function(house: any): Promise<any>{
  return await model('Contract').create(house);
};

ContractSchema.methods.isRegistered = async function(id: string | null, email: string | null): Promise<boolean>{
  let result = null

  if(id && !email)
    result = await model('Contract').find({ _id: id });
  else if(!id && email)
    result = await model('Contract').find({ email });
  else
    throw { message: 'Invalid param', status: 500 }
  
  if(result && result.length)
    return true
  
  return false
};

ContractSchema.methods.getAllContracts = async function(): Promise<any>{
  const result = await model('Contract').find().populate('house').populate('client');  
  return result
};

ContractSchema.methods.updateContractById = async function(id: string, contract: any): Promise<any>{
  const result = await model('Contract').findByIdAndUpdate(id, contract, {new: true});
  return result
};

ContractSchema.methods.deleteContractById = async function(id: string): Promise<any>{
  const result = await model('Contract').findByIdAndDelete(id);
  return result
};

ContractSchema.methods.getClientList = async function(houseId: string): Promise<any>{
  const contracts = await model('Contract').find().populate('house').populate('client');    
  const result = contracts.filter(c => {
    if(c.house){
      if(c.house._id.toHexString() == houseId)
        return c
    }
  }) 
  return result
};

ContractSchema.methods.getHouseList = async function(clientId: string): Promise<any>{
  const contracts = await model('Contract').find().populate('house').populate('client'); 
    
  const result = contracts.filter(c => {
    if(c.client){      
      if(c.client._id.toHexString() == clientId)
        return c
    }
  }) 
  return result
};

export const Contract: Model<ContractModel> = model<ContractModel>('Contract', ContractSchema)