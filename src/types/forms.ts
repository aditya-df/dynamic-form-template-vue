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
