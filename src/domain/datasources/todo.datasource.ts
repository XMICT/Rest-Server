import type { CreateTodoDto, UpdateTodoDto } from "../dto/index.js";
import type { Todo } from "../entities/todo.entity.js";

export abstract class TodoDataSource {
    abstract getAll(): Promise<Todo[]>;
    abstract getById(id: number): Promise<Todo>;
    abstract create(createTodoDto: CreateTodoDto): Promise<Todo>;
    abstract update(updateTodoDto: UpdateTodoDto): Promise<Todo>;
    abstract delete(id: number): Promise<Todo>;
}