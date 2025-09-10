import express from 'express'
import path from 'path'

export interface OptionsServer {
  port: number
  publicPath?: string
}

export class Server {
  private readonly app = express()
  private readonly port: number
  private readonly publicPath: string

  constructor (options: OptionsServer) {
    const { port, publicPath = 'public' } = options
    this.port = port
    this.publicPath = publicPath
  }

  start (): void {
    const { port, publicPath } = this
    // Carga y configura los archivos estaticos al servidor
    this.app.use(express.static(publicPath))

    // El enrutador ubicado en el archivo index.html se encargara de responder el contenido
    this.app.use((req, res) => {
      const indexPath = path.join(process.cwd(), publicPath, 'index.html')
      res.sendFile(indexPath)
    })

    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  }
}
