/**
 * Represents the structure of a form field.
 * Used for dynamic form generation.
 */
export type FormField = {
  id: string // Unique identifier for the field
  label: string // Display label for the field
  type?: string // Input type (e.g., 'text', 'email', 'password')
  placeholder?: string // Placeholder text for the input
  disabled?: boolean // Whether the input is disabled
  error?: boolean // Whether the field has an error state
  autofocus?: boolean // Whether the input should autofocus on load
}

export type DynamicFormData = Record<string, string>[]

export type FormFieldModel = {
  field: FormField
  value: string | null
  component: any
}
