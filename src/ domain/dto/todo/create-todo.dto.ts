export class CreateTodoDto {
    private constructor(
        public readonly task: string,
    ) { }

    public static create(props: { [property: string]: any } = {}): [string?, CreateTodoDto?] {
        const { task } = props

        if (!task) return ['Task is required to create a todo']
        return [, new CreateTodoDto(task)]
    }
}