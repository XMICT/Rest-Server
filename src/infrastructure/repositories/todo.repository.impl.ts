import type { Todo, CreateTodoDto, UpdateTodoDto, TodoRepository, TodoDataSource } from "../../domain/index.js";

export class TodoRepositoryImpl implements TodoRepository {
    constructor(
        private readonly todoDataSource: TodoDataSource
    ) { }

    getAll(): Promise<Todo[]> {
        return this.todoDataSource.getAll()
    }
    getById(id: number): Promise<Todo | null> {
        return this.todoDataSource.getById(id)
    }
    create(createTodoDto: CreateTodoDto): Promise<Todo> {
        return this.todoDataSource.create(createTodoDto)
    }
    update(updateTodoDto: UpdateTodoDto): Promise<Todo> {
        return this.todoDataSource.update(updateTodoDto)
    }
    delete(id: number): Promise<Todo> {
        return this.todoDataSource.delete(id)
    }
}