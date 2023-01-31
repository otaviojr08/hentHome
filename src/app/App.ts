import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes'

export class App {
  public express: express.Application

  public constructor(){
    this.express = express()
    this.midlewares()
    this.database()
    this.routes()
  }

  private midlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
    mongoose.set("strictQuery", true)
  }

  private database(): void {
    mongoose.connect('mongodb://localhost:27017/hentHouse')   
  }

  private routes(): void {
    this.express.use(routes)
  }
}
