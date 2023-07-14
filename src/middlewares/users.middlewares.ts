import usersService from '@/services/users.service'
import { validate } from '@/utils/validation'
import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing required fields' })
  }
  next()
}

export const registerValidator = validate(
  checkSchema({
    name: {
      in: ['body'],
      isString: true,
      errorMessage: 'Name is required',
      isLength: {
        errorMessage: 'Name should be at least 3 characters long',
        options: { min: 3, max: 100 }
      },
      trim: true
    },
    email: {
      notEmpty: true,
      isEmail: true,
      errorMessage: 'Invalid email',
      trim: true,
      custom: {
        options: async (value) => {
          const isEmailExist = await usersService.checkEmailExist({ email: value })
          if (isEmailExist) {
            throw new Error('Email already exists')
          }
          return true
        }
      }
    },
    password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: { max: 100 },
        errorMessage: 'Password should be at most 100 characters long'
      },
      errorMessage: 'Invalid password',
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage:
          'Password should be at least 6 characters long and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol'
      }
    },
    confirm_password: {
      notEmpty: true,
      isString: true,
      errorMessage: 'Invalid confirm password',
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage:
          'Password should be at least 6 characters long and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol'
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password')
          }
          return true
        }
      }
    },
    data_of_birth: {
      isISO8601: {
        options: { strict: true, strictSeparator: true }
      }
    }
  })
)
