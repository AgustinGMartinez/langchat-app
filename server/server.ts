import express from "express"
import { Request, Response, NextFunction } from "express"
import next from "next"
import logger from "../services/logger"

const port = parseInt(process.env.PORT!, 10) || 3000
const dev = process.env.NODE_ENV !== "production"
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
    logger.info({ error })
    res.send("error handled")
  })

  server.listen(port, (err: Error | undefined) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
