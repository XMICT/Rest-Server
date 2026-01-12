import { prisma } from "../../config/database/postgres/index.js";
import { Todo, TodoDataSource, type CreateTodoDto, type UpdateTodoDto } from "../../domain/index.js";
import { NotFoundError } from "../../utils/errors/custom.js";

export class TodoDataSourceImpl implements TodoDataSource {

    async getAll(): Promise<Todo[]> {
        const _todos = await prisma.todo.findMany()
        return _todos.map(Todo.fromObject)
    }

    async getById(id: number): Promise<Todo> {
        const _todo = await prisma.todo.findUnique({ where: { id } })
        if (!_todo) throw new NotFoundError(`Todo with id (${id}) not found`)
        return Todo.fromObject(_todo)
    }

    async create(createTodoDto: CreateTodoDto): Promise<Todo> {
        const _todo = await prisma.todo.create({ data: createTodoDto })
        return Todo.fromObject(_todo)
    }

    async update(udpateTodoDto: UpdateTodoDto): Promise<Todo> {
        await this.getById(udpateTodoDto.id)

        const _todo = await prisma.todo.update({
            where: { id: udpateTodoDto.id },
            data: udpateTodoDto.values
        })

        return Todo.fromObject(_todo)
    }

    async delete(id: number): Promise<Todo> {
        await this.getById(id)

        const _todo = await prisma.todo.delete({ where: { id } })
        return Todo.fromObject(_todo)
    }
}