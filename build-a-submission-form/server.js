import express from 'express'
const app = express()
import apiRouter from './routes/api.routes.js'
import { notFoundHandler, finalErrorHandler } from './middleware/error.middleware.js'

app.use((req, res, next) => {
    console.log(req)
    console.log(req.url)
    next()
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', apiRouter)
app.use(notFoundHandler)
app.use(finalErrorHandler)


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})