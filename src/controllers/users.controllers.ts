import databaseService from '@/services/database.service'
import usersService from '@/services/users.service'
import { Request, Response } from 'express'

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await usersService.getUsers()
    return res.status(200).json({ users })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const loginController = async (req: Request, res: Response) => {
  const { name, email, password, confirm_password } = req.body
  try {
    const user = await usersService.login({ email, password })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    return res.status(200).json({ message: 'Login successfully', data: user })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}
export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await usersService.register({ email, password })

    if (!result) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    return res.status(200).json({ message: 'Register successfully', data: result })
  } catch (error) {
    return res.status(400).json({ message: 'register failed' })
  }
}
export const deleteUserController = async (req: Request, res: Response) => {
  const { email } = req.body
  try {
    const result = await usersService.deleteUser({ email })
    if (!result || result.deletedCount === 0) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    return res.status(200).json({ message: 'Delete successfully', data: result })
  } catch (error) {
    return res.status(400).json({ message: 'Delete failed' })
  }
}
