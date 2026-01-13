import { CreateTodoDto } from "../../dto/index.js";
import type { Todo } from "../../entities/todo.entity.js";
import type { TodoRepository } from "../../repositories/todo.repository.js";

export class CreateTodo {
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public async execute(createTodoDto: CreateTodoDto): Promise<Todo> {
        return await this.todoRepository.create(createTodoDto)
    }
}