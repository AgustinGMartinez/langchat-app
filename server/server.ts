import express from "express"
import { Request, Response, NextFunction } from "express"
import next from "next"
import { logger } from "./services"
require('dotenv').config();
import config from 'config';

const port = config.get('port');
const dev = config.get('isDev') as boolean;
const app = next({ dev, dir: "./app" })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // TODO: implement actual api router
  server.use("/api", (req: Request, res: Response) => res.json({ hola: false }))

  // handler del servidor de next, maneja todas las rutas de /pages y /public, más todas las
  // optimizaciones que hace next (no sé cuáles son)
  server.all("*", (req: Request, res: Response) => {
    return handle(req, res)
  })

  // TODO: implement actual error handler
  // nuestro error handler
  server.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error({ msg: error.message })
    res.send("error handled")
  })

  server.listen(port, () => {
    logger.info(`> Ready on http://localhost:${port}`);
  })
})
