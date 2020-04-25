import { createLogger, format, transports } from 'winston';

export default createLogger({
   format: format.json(),
   transports: [
      new transports.File({ filename: `${__dirname}/logs/errors/error.log`, level: 'error' }),
      new transports.File({ filename: `${__dirname}/logs/info/info.log` }),
      new transports.Console({ level: 'debug' })
   ]
})