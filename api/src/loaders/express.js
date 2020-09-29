import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import { api, logger } from '../config'
import routes from '../api/routes'
import errors from '../api/errors'

export default ({ app }) => {
  app.enable('trust proxy')
  app.use(express.static('public'))
  app.use(cors())
  app.use(bodyParser.json())
  app.use(morgan('dev'))
  app.use(helmet())
  app.use(api.prefix, routes)

  app.get('/status', (req, res) => {
    res.status(200).json({ status: 200, message: "Working successfuly!" }).end()
  })
  app.head('/status', (req, res) => {
    res.status(200).end()
  })

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err['status'] = 404
    err['documentation_url'] = 'http://localhost:8080/api/docs'
    next(err)
  })

  /// error handler
  app.use((err, req, res, next) => {
    let errorsss;
    errors.map(({ message, status, code }) => {
      if (err === code) {
        errorsss = {
          message,
          status,
          documentation_url: err.documentation_url
        }
        res.json({ errorsss })
      }
    })
    errors.find(error => error.code === )
    console.log('--')
    res.status(err.status || 500)
    errorsss = {
      status: err.status,
      message: err.message,
      documentation_url: err.documentation_url
    }
    res.json({ errorsss })
    //logger.error(JSON.stringify({ errors }))
    /* @TODO: specify req.ip in log */
  })
}
