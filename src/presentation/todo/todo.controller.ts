/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Request, Response } from 'express'
import { NotFoundError, ValidationError } from '../../utils/errors/custom.js'
import { prisma } from '../../config/database/postgres/index.js'
import { CreateTodoDto } from '../../ domain/dto/index.js'

interface Todo {
  task: string,
  completedAt?: Date
}

export class TodoContoller {
  public getTodos = async (req: Request, res: Response): Promise<Response> => {
    const _todos = await prisma.todo.findMany()
    return res.status(200).json(_todos)
  }

  public getTodoById = async (req: Request, res: Response): Promise<Response> => {
    const todoId = Number(req.params.id)
    if (isNaN(todoId)) throw new ValidationError('El id debe ser un numero')

    const _todo = await prisma.todo.findUnique({ where: { id: todoId } })
    if (_todo == null) throw new NotFoundError('No se encontro el todo registrado')

    return res.status(200).json(_todo)
  }

  public createTodo = async (req: Request, res: Response): Promise<Response> => {
    const [error, todo] = CreateTodoDto.create(req.body)
    if (error) throw new ValidationError(error)

    const _todo = await prisma.todo.create({ data: todo! })
    return res.status(200).json(_todo)
  }

  public updateTodo = async (req: Request, res: Response): Promise<Response> => {
    const todoId = Number(req.params.id)
    const { task } = req.body
    if (isNaN(todoId)) throw new ValidationError('El id debe ser un numero')

    const _todo = await prisma.todo.findUnique({ where: { id: todoId } })
    if (!_todo) throw new NotFoundError('No se encontro el todo')

    const dataToUpdate: Partial<Todo> = new Object()
    if (task) dataToUpdate.task = task

    const _todoUpdated = await prisma.todo.update({ data: dataToUpdate, where: { id: todoId } })
    return res.status(200).json(_todoUpdated)
  }

  public deleteTodo = async (req: Request, res: Response): Promise<Response> => {
    const todoId = Number(req.params.id)
    if (isNaN(todoId)) throw new ValidationError('El id debe ser un numero')

    const todo = await prisma.todo.findUnique({ where: { id: todoId } })
    if (!todo) throw new NotFoundError('No se encontro el todo')

    const todoDeleted = await prisma.todo.delete({ where: { id: todoId } })
    return res.status(200).json(todoDeleted)
  }
}
