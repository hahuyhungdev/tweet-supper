import {
  getUsersController,
  loginController,
  registerController,
  deleteUserController
} from '@/controllers/users.controllers'
import { loginValidator } from '@/middlewares/users.middlewares'
import { Router } from 'express'

const userRouter = Router()
userRouter.get('', getUsersController)
userRouter.post('/login', loginValidator, loginController)
userRouter.post('/register', loginValidator, registerController)
userRouter.delete('/delete', deleteUserController)

export default userRouter
