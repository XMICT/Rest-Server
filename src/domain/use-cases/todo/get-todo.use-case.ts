import type { Todo } from "../../entities/todo.entity.js";
import type { TodoRepository } from "../../repositories/todo.repository.js";

export class GetTodo {
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public async execute(id: number): Promise<Todo> {
        return await this.todoRepository.getById(id)
    }
}