import type { Todo } from "../../entities/todo.entity.js";
import type { TodoRepository } from "../../repositories/todo.repository.js";

export class GetTodos {
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public async execute(): Promise<Todo[]> {
        return await this.todoRepository.getAll()
    }
}