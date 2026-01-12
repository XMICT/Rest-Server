import type { CreateTodoDto, UpdateTodoDto } from "../dto/index.js";
import type { Todo } from "../entities/todo.entity.js";

export abstract class TodoRepository {
    abstract getAll(): Promise<Todo[]>;
    abstract getById(id: number): Promise<Todo | null>;
    abstract create(todo: CreateTodoDto): Promise<Todo>;
    abstract update(todo: UpdateTodoDto): Promise<Todo>;
    abstract delete(id: number): Promise<Todo>;
}