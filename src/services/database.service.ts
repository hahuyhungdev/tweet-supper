import { Collection, Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import path from 'path'
import User from '@/models/schemas/User.schema'
dotenv.config({ path: path.resolve(__dirname, '../../.env.development') })

// Replace the following with your Atlas connection string
const uri = `mongodb+srv://
${process.env.DB_USERNAME}:${process.env.PASSWORD_DATABASE}@twitter.wfhhh29.mongodb.net/`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(`${process.env.PASSWORD_DATABASE}`)
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(`There was an error connecting to MongoDB. Check whether your URI is correct. ${error}`)
      throw error
    }
  }
  get users(): Collection<User> {
    return this.db.collection('users')
  }
}
// create a new instance of the Database class
const databaseService = new DatabaseService()
export default databaseService
