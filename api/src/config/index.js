export { default as swaggerConfig } from './swagger.config'
export { default as logger } from './logger.config'
import dotenv from 'dotenv'
dotenv.config()

const { DB_URI, PORT, JWT_SECRET_KEY, SENDER_MAIL, SENDER_MAIL_PW, GOOGLE_CLIENT_ID } = process.env

export const api = {
  port: PORT || 8080,
  jwtSecretKey: JWT_SECRET_KEY,
  googleClientId: GOOGLE_CLIENT_ID,
  senderMail: SENDER_MAIL,
  senderMailPw: SENDER_MAIL_PW,
  dbUri: DB_URI,
  prefix: "/api",
  specs: "/docs",
}