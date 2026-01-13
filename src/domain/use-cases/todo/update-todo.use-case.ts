import { UpdateTodoDto } from "../../dto/index.js";
import type { Todo } from "../../entities/todo.entity.js";
import type { TodoRepository } from "../../repositories/todo.repository.js";

export class UpdateTodo {
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public async execute(updateTodoDto: UpdateTodoDto): Promise<Todo> {
        return await this.todoRepository.update(updateTodoDto)
    }
}