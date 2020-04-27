import { createLogger, format, transports } from 'winston'
import moment from 'moment'
import path from 'path'

const { combine, timestamp, printf, colorize } = format

const myFormat = printf(({ level, message, timeStamp }) => {
  const msg = typeof message === 'object' ? JSON.stringify(message, null, 2) : message
  return `${moment(timeStamp).format('DD/MM/YYYY - H:mm:s')} ${level}: ${msg}`
})

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.File({
      filename: path.resolve(__dirname, '..', '..', 'logs', 'error.log'),
      level: 'error',
    }),
    new transports.File({ filename: path.resolve(__dirname, '..', '..', 'logs', 'info.log') }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(colorize(), timestamp(), myFormat),
    }),
  )
}

export { logger }
