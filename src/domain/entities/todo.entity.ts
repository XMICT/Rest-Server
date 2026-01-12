export class Todo {
    constructor(
        public id: number,
        public task: string,
        public completedAt?: Date | null
    ) { }

    public isCompleted(): boolean {
        return !!this.completedAt;
    }

    public static fromObject(obj: { [key: string]: any }): Todo {
        let { id, task, completedAt } = obj
        // Propiedades de la entidad
        let _id, _task, _completedAt

        if (!id) throw new Error('Id is required')
        if (isNaN(Number(id))) throw new Error('Id must be a number')
        _id = Number(id)

        if (!task) throw new Error('Task is required')
        _task = task

        if (completedAt) {
            _completedAt = new Date(completedAt)
            if (_completedAt.toString() == 'Invalid Date') throw new Error('CompletedAt must be a valid date')
        }

        return new Todo(_id, _task, _completedAt)
    }
}