import express, { NextFunction } from 'express'
import databaseService from '@/services/database.service'
import userRouter from './routes/user.routes'
import { Request, Response } from 'express-serve-static-core'
const app = express()
const port = 2503
databaseService.connect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/users', userRouter)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('loi roi ne', err)
  res.status(500).json({ message: err.message })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
