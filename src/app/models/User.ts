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
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
}, {
  methods: {
    fullName() {
      return `${this.firstName?.trim()} ${this.lastName?.trim()}`;
    }
  },
  timestamps: true
},
)

export const User: Model<UserModel> = model<UserModel>('User', UserSchema)