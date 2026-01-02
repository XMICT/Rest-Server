export class CreateTodoDto {
    private constructor(
        public readonly task: string,
    ) { }

    public static create(props: { [property: string]: any } = {}): [string?, CreateTodoDto?] {
        const { task } = props

        if (!task) {
            return ['El campo task es requerido']
        }

        return [, new CreateTodoDto(task)]
    }
}