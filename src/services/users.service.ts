import User from '@/models/schemas/User.schema'
import databaseService from './database.service'
import { IRegisterReqBody } from '@/models/requests/user.request'
import { signToken } from '@/utils/jwt'
import { TokenType } from '@/configs/userStatus'
import { hashPassword } from '@/utils/crypto'

class UsersService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN
      }
    })
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN
      }
    })
  }
  async getUsers() {
    const result = await databaseService.users.find().toArray()
    return result
  }
  async register(payload: IRegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
      })
    )
    const user_id = result.insertedId.toHexString()
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
    return { accessToken, refreshToken }
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
