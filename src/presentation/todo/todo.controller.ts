/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Request, Response } from 'express'
import { NotFoundError, ValidationError } from '../../utils/errors/custom.js'

const todos = [
  { id: 1, task: 'View Node JS Curse', createdAt: new Date() },
  { id: 2, task: 'Practice mecanography', createdAt: new Date() }
]

export class TodoContoller {
  public getTodos = (req: Request, res: Response): Response => {
    return res.status(200).json(todos)
  }

  public getTodoById = (req: Request, res: Response): Response => {
    const id = req.params.id

    if (id == null) throw new ValidationError('Es requerido enviar el id')

    const todo = todos.find(t => t.id === Number(id))
    if (todo == null) throw new NotFoundError('No se encontro el todo registrado')

    return res.status(200).json(todo)
  }

  public createTodo = (req: Request, res: Response): Response => {
    const body = req.body

    const newTodo = {
      id: this.getNewId(),
      task: body.task,
      createdAt: new Date()
    }

    todos.push(newTodo)
    return res.status(200).json(newTodo)
  }

  public updateTodo = (req: Request, res: Response): Response => {
    const todoId = req.params.id
    const { task, createdAt } = req.body
    const data = { task, createdAt }

    /** 1. Manejado de forma mutable
      const todoFounded = todos.find(todo => todo.id === Number(todoId))
      todoFounded.task = body.task
    */

    const todo = todos.find(todo => todo.id === Number(todoId))
    if (todo == null) throw new NotFoundError('No se encontro el todo')

    data.task = task || todo.task
    if (typeof createdAt !== 'undefined') {
      data.createdAt = new Date(createdAt || todo.createdAt)
    }

    const todoIndexFounded = todos.findIndex(todo => todo.id === Number(todoId))
    todos[todoIndexFounded] = { ...todo, ...data }

    return res.status(200).json(todos[todoIndexFounded])
  }

  public deleteTodo = (req: Request, res: Response): Response => {
    const todoId = req.params.id

    const todo = todos.find(todo => todo.id === Number(todoId))
    if (!todo) throw new NotFoundError('No se encontro el todo')

    todos.splice(todos.indexOf(todo), 1)
    return res.status(200).json(todo)
  }

  private getNewId (): number {
    return todos.length + 1
  }
}
