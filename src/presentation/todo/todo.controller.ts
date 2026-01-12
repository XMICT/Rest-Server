/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Request, Response } from 'express'
import { ValidationError } from '../../utils/errors/custom.js'
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dto/index.js'
import type { TodoRepository } from '../../domain/index.js'

export class TodoContoller {

  constructor(
    private readonly todoRepository: TodoRepository
  ) { }

  public getTodos = async (req: Request, res: Response): Promise<Response> => {
    const _todos = this.todoRepository.getAll()
    return res.status(200).json(_todos)
  }

  public getTodoById = async (req: Request, res: Response): Promise<Response> => {
    const todoId = Number(req.params.id)
    if (isNaN(todoId)) throw new ValidationError('El id debe ser un numero')

    const _todo = await this.todoRepository.getById(todoId)
    return res.status(200).json(_todo)
  }

  public createTodo = async (req: Request, res: Response): Promise<Response> => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body)
    if (error) throw new ValidationError(error)

    const _todo = await this.todoRepository.create(createTodoDto!)
    return res.status(200).json(_todo)
  }

  public updateTodo = async (req: Request, res: Response): Promise<Response> => {
    const todoId = Number(req.params.id)

    const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id: todoId })
    if (error) throw new ValidationError(error)

    const _todoUpdated = await this.todoRepository.update(updateTodoDto!)
    return res.status(200).json(_todoUpdated)
  }

  public deleteTodo = async (req: Request, res: Response): Promise<Response> => {
    const todoId = Number(req.params.id)
    if (isNaN(todoId)) throw new ValidationError('El id debe ser un numero')

    const _todoDeleted = await this.todoRepository.delete(todoId)
    return res.status(200).json(_todoDeleted)
  }
}
