import express from 'express'
import databaseService from '@/services/database.service'
const app = express()
const port = 3000

app.use(express.json())
// app.use('/users')
databaseService.connect()
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
