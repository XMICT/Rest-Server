import { envs } from './config/plugins/env.plugin.js'
import { Server } from './presentation/server.js'

(() => {
  main()
})()

function main (): void {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH
  })

  server.start()
}
