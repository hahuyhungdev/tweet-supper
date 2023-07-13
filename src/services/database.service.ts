import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../../.env.development') })

// Replace the following with your Atlas connection string
console.log(process.env.DB_USERNAME)
const uri = `mongodb+srv://
${process.env.DB_USERNAME}:${process.env.PASSWORD_DATABASE}@twitter.wfhhh29.mongodb.net/`

class DatabaseService {
  private client: MongoClient
  constructor() {
    this.client = new MongoClient(uri)
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.client.db('admin').command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } finally {
      // Ensures that the client will close when you finish/error
      await this.client.close()
    }
  }
}
// create a new instance of the Database class
const databaseService = new DatabaseService()
export default databaseService
