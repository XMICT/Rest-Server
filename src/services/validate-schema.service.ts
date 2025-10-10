import { ValidationError } from '../utils/errors/custom.js'

export interface Validations {
  allPropertiesRequired?: boolean
  additionalProperties?: boolean
}

export class ValidateSchema {
  private readonly validations: Validations

  constructor ({ allPropertiesRequired = false, additionalProperties = false }: Validations) {
    this.validations = { allPropertiesRequired, additionalProperties }
  }

  execute (fields: null | Record<string, unknown>, expectedProperties: string[]): void {
    const { allPropertiesRequired = false, additionalProperties = false } = this.validations
    if (fields == null || Object.keys(fields).length === 0) throw new ValidationError('No se recibio ninguna propiedad en el cuerpo de la peticion')
    const properties = Object.keys(fields)

    if (additionalProperties) this.checkAdditionalProperties(properties, expectedProperties)
    if (allPropertiesRequired) this.checkRequiredProperties(properties, expectedProperties)
  }

  /**
   * Valida si se encuentran todas las propiedades requeridas
   * @param {string[]} properties Propiedades del objeto
   * @param {string[]} requiredProperties Propiedades que se requieren para continuar el proceso
   */
  private checkRequiredProperties (properties: string[], requiredProperties: string[]): void {
    const isValid = requiredProperties.every(property => properties.includes(property))
    if (!isValid) throw new ValidationError('No se recibieron todos los campos requeridos')
  }

  /**
   * Valida si hay propiedades adicionales en el modelo
   * @param {string[]} properties Propiedades del objeto
   * @param {string[]} requiredProperties Propiedades con las que solamente debe contar
   */
  private checkAdditionalProperties (properties: string[], requiredProperties: string[]): void {
    if (properties.length > requiredProperties.length) {
      throw new ValidationError('No se admiten propiedades adicionales')
    }

    const isValid = !properties.some(property => !requiredProperties.includes(property))
    if (!isValid) throw new ValidationError('No se admiten propiedades adicionales')
  }
}
