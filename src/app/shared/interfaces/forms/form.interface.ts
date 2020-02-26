export interface IInput {
  field?: string;
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  helper?: string;
  availableOptions?: string[]; // Select only
  startView?: 'month' | 'year' | 'multi-year'; // Date picker only
}

export interface IInputs {
  [key: string]: IInput;
}
