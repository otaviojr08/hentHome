import { Document, Schema, Model, model } from 'mongoose'
import { UserInterface } from '../interfaces/UserInterface'

export interface UserModel extends UserInterface, Document {
  fullName(): string
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
}, {
  timestamps: true
})

UserSchema.methods.fullName = function (): string {
  return (this.firstName.trim() + ' ' + this.lastName.trim())
}

export const User: Model<UserModel> = model<UserModel>('User', UserSchema)