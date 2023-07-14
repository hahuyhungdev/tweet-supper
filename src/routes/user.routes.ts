import {
  deleteUserController,
  getUsersController,
  loginController,
  registerController
} from '@/controllers/users.controllers'
import { loginValidator, registerValidator } from '@/middlewares/users.middlewares'
import { Router } from 'express'

const userRouter = Router()
userRouter.get('', getUsersController)
userRouter.post('/login', loginValidator, loginController)
userRouter.post('/register', registerValidator, registerController)
userRouter.delete('/delete', deleteUserController)

export default userRouter
