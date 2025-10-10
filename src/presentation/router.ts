import { Router } from 'express'
import { TodoRoutes } from './todo/todo.router.js'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppRouter {
  static get routes (): Router {
    const router = Router()

    router.use('/api/todo', TodoRoutes.routes)

    // Manejador de errores
    return router
  }
}
