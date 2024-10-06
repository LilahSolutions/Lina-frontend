import { FieldData, FormBuilderField } from './useRichieForm';

/**
 * Data types for nested form fields. Used for arrayOf and mapOf fields.
 * @see arrayOf,mapOf in utils file for more information.
 */
export enum TYPES {
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  date = 'date',
}

export enum INPUT_TYPES {
  toggle = 'toggle',
  radio = 'radio',
  text = 'text',
  number = 'number',
  password = 'password',
  date = 'date',
  checkbox = 'checkbox',
  select = 'select',
  textarea = 'textarea',
  hidden = 'hidden',
  file = 'file',
  submit = 'submit',
  button = 'button',
  big = 'big',
  dropdown = 'dropdown',
  range = 'range',
  search = 'search',
  check = 'check',
  default = 'default',
}

export type FormStructure = FieldData[];
export type FormInput = FormBuilderField[];
