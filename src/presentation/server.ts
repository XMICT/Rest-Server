import express, { Router, type ErrorRequestHandler } from 'express'
import path from 'path'

export interface OptionsServer {
  port: number
  routes: Router
  publicPath?: string
  errorHandler: ErrorRequestHandler
}

export class Server {
  private readonly app = express()
  private readonly port: number
  private readonly publicPath: string
  private readonly routes: Router
  private readonly errorHandler: ErrorRequestHandler

  constructor (options: OptionsServer) {
    const { port, routes, publicPath = 'public', errorHandler } = options
    this.port = port
    this.routes = routes
    this.publicPath = publicPath
    this.errorHandler = errorHandler
  }

  start (): void {
    const { port, publicPath } = this

    this.app.use(express.urlencoded())

    this.app.use(express.json())

    // Carga y configura los archivos estaticos al servidor
    this.app.use(express.static(publicPath))

    // Definicion de rutas
    this.app.use(this.routes)

    // En caso de error en la api, el manejador se encargara de responder la solicitud
    this.app.use(this.errorHandler)

    // El enrutador ubicado en el archivo index.html se encargara de responder el contenido (SPA)
    this.app.use((req, res) => {
      const indexPath = path.join(process.cwd(), publicPath, 'index.html')
      res.sendFile(indexPath)
    })

    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  }
}
