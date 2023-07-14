import User from '@/models/schemas/User.schema'
import databaseService from './database.service'

class UsersService {
  async getUsers() {
    const result = await databaseService.users.find().toArray()
    return result
  }
  async register(payload: { email: string; password: string }) {
    const { email, password } = payload
    const result = await databaseService.users.insertOne(new User({ email, password }))
    return result
  }
  async checkEmailExist(payload: { email: string }) {
    const user = await databaseService.users.findOne({ email: payload.email })
    return Boolean(user)
  }
  async login(payload: { email: string; password: string }) {
    const { email, password } = payload
    const result = await databaseService.users.findOne({ email, password })
    return result
  }
  async deleteUser(payload: { email: string }) {
    const { email } = payload
    const result = await databaseService.users.deleteOne({ email })
    return result
  }
}

const usersService = new UsersService()

export default usersService
