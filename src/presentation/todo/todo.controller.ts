/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Request, Response } from 'express'
import { ValidationError } from '../../utils/errors/custom.js'
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, UpdateTodo, CreateTodoDto, UpdateTodoDto, type TodoRepository } from '../../domain/index.js'

export class TodoContoller {

  constructor(
    private readonly todoRepository: TodoRepository
  ) { }

  public getTodos = (req: Request, res: Response): Promise<Response> => {
    return new GetTodos(this.todoRepository)
      .execute()
      .then(_todos => res.status(200).json(_todos))
  }

  public getTodoById = (req: Request, res: Response): Promise<Response> => {
    const todoId = Number(req.params.id)
    if (isNaN(todoId)) throw new ValidationError('El id debe ser un numero')

    return new GetTodo(this.todoRepository)
      .execute(todoId)
      .then(_todo => res.status(200).json(_todo))
  }

  public createTodo = (req: Request, res: Response): Promise<Response> => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body)
    if (error) throw new ValidationError(error)

    return new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then(_todo => res.status(200).json(_todo))
  }

  public updateTodo = (req: Request, res: Response): Promise<Response> => {
    const todoId = Number(req.params.id)

    const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id: todoId })
    if (error) throw new ValidationError(error)

    return new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then(_todo => res.status(200).json(_todo))
  }

  public deleteTodo = (req: Request, res: Response): Promise<Response> => {
    const todoId = Number(req.params.id)
    if (isNaN(todoId)) throw new ValidationError('El id debe ser un numero')

    return new DeleteTodo(this.todoRepository)
      .execute(todoId)
      .then(_todo => res.status(200).json(_todo))
  }
}
