/**
 * Represents the structure of a form field.
 * Used for dynamic form generation.
 */
export type FormField = {
  // general input
  id: string // Unique identifier for the field
  label: string // Display label for the field
  type?: string // Input type (e.g., 'text', 'email', 'password')
  placeholder?: string // Placeholder text for the input
  disabled?: boolean // Whether the input is disabled
  error?: boolean // Whether the field has an error state
  autofocus?: boolean // Whether the input should autofocus on load

  // range
  min?: number
  max?: number
  step?: number

  // textarea
  maxLength?: number
  rows?: number

  // select
  options?: OptionType[]
  multiple?: boolean
  direction?: 'horizontal' | 'vertical'
}

type OptionType = {
  label: string
  value: string
  disabled?: boolean
}

export type DynamicFormData = Record<string, string>[]

export type FormFieldModel = {
  field: FormField
  value: string | Array<any> | null
  component: any
}

export class FormConfig {
  type: string
  id: string
  label: string
  placeholder: string
  disabled: boolean

  constructor() {
    this.type = ''
    this.id = ''
    this.label = 'Label'
    this.placeholder = 'Input your value here'
    this.disabled = false
  }

  reset() {
    this.type = ''
    this.id = ''
    this.label = 'Label'
    this.placeholder = 'Input your value here'
    this.disabled = false
  }

  clone(): FormConfig {
    const newConfig = new FormConfig()
    newConfig.type = this.type
    newConfig.id = this.id
    newConfig.label = this.label
    newConfig.placeholder = this.placeholder
    newConfig.disabled = this.disabled
    return newConfig
  }
}
