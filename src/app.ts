import { envs } from './config/plugins/env.plugin.js'
import { AppRouter } from './presentation/router.js'
import { Server } from './presentation/server.js'
import { errorHandlerMiddleware } from './presentation/middlewares/error-handler.middleware.js'

function main (): void {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,

    errorHandler: errorHandlerMiddleware,
    routes: AppRouter.routes
  })

  server.start()
}

(() => {
  main()
})()
