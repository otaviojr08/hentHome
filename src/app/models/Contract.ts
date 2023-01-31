import { Document, Schema, Model, model } from 'mongoose'
import { ContractInterface } from '../interfaces/ContractInterface'

export interface ContractModel extends ContractInterface, Document {
  create(contract: any): Promise<any>,
  isRegistered(id: string | null, email: string | null): Promise<boolean>,
  getAllContracts(): Promise<any>,
  updateContractById(id: string, contract: any): Promise<any>
  deleteContractById(id: string): Promise<any>
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
  idHouse: {
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
  const result = await model('Contract').find();
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

export const Contract: Model<ContractModel> = model<ContractModel>('Contract', ContractSchema)