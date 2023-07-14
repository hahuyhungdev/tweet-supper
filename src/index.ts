import express from 'express'
import databaseService from '@/services/database.service'
import userRouter from './routes/user.routes'
const app = express()
const port = 2503
databaseService.connect()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/users', userRouter)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
