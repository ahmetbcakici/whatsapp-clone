import express from 'express'
import { api } from './config'

const app = express()
const port = api.port

const http = require('http').createServer(app)
const io = require('socket.io')(http)

require('./loaders').default({ expressApp: app })

app.use(function (req, res, next) {
  res.io = io
  next()
})
io.setMaxListeners(0)
io.on('connection', (socket) => {
  console.log('socket connection')
})

http.listen(port, err => {
  if (err) {
    console.log(err)
    return process.exit(1)
  }
  console.log(`Server is running on ${port}`)
})

export default app
