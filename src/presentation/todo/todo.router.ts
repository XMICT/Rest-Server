import { Router } from 'express'
import { TodoContoller } from './todo.controller.js'
import schemaValidator from '../middlewares/validate-schema.middleware.js'
import { TodoDataSourceImpl } from '../../infrastructure/datasources/todo.datasource.impl.js'
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.repository.impl.js'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class TodoRoutes {
  static get routes(): Router {
    const router = Router()

    /** Carga del controlador */
    // Instanciamos la fuente de datos
    const todoDatasource = new TodoDataSourceImpl()

    // Definimos el intermediario entre el controlador y la fuente de datos
    const todoRepository = new TodoRepositoryImpl(todoDatasource)

    // Instanciamos el controlador
    const todoController = new TodoContoller(todoRepository)

    /** Rutas */
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
