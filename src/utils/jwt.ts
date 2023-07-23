import { SignOptions, sign } from 'jsonwebtoken'

export const signToken = ({
  payload,
  privateKey = process.env.JWT_PRIVATE_KEY as string,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  privateKey?: string
  options?: SignOptions
}) => {
  return new Promise((resolve, reject) => {
    sign(payload, privateKey, options, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}
