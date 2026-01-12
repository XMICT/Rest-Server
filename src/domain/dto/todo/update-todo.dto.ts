export class UpdateTodoDto {
    private constructor(
        public readonly id: number,
        public readonly task?: string,
        public readonly completedAt?: Date | null
    ) { }

    get values() {
        const dataToUpdate: { [property: string]: any } = new Object()
        if (this.task) dataToUpdate.task = this.task
        if (this.completedAt !== undefined) dataToUpdate.completedAt = this.completedAt
        return dataToUpdate
    }

    public static update(props: { [property: string]: any } = {}): [string?, UpdateTodoDto?] {
        const { id, task, completedAt } = props
        let taskNormalized = task, completedAtNormalized = completedAt

        if (isNaN(Number(id))) {
            return ['El id debe ser un numero']
        }

        if (task) {
            taskNormalized = task.trim()
            if (!taskNormalized) return ['El campo task no puede estar vacio']
        }

        if (completedAt) {
            completedAtNormalized = new Date(completedAt)
            if (completedAtNormalized.toString() === 'Invalid Date') return ['El campo completedAt debe ser una fecha valida']
        }

        return [, new UpdateTodoDto(Number(id), taskNormalized, completedAtNormalized)]
    }
}