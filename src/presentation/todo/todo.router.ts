import { Router } from 'express'
import { TodoContoller } from './todo.controller.js'
import schemaValidator from '../middlewares/validate-schema.middleware.js'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TodoRoutes {
  static get routes(): Router {
    const router = Router()
    const todoController = new TodoContoller()

    router.get('/', todoController.getTodos)
    router.get('/:id', todoController.getTodoById)

    router.post('/', schemaValidator(['task', 'completedAt'], {
      additionalProperties: true
    }), todoController.createTodo)

    router.put('/:id', schemaValidator(['task', 'completedAt'], {
      additionalProperties: true
    }), todoController.updateTodo)

    router.delete('/:id', todoController.deleteTodo)

    return router
  }
}
