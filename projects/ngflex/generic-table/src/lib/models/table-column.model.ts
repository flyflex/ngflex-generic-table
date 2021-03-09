export interface TableColumn {
  field: string;

  type?: string;
  format?: string;
  header?: string;
  alternateField?: string;
  color?: string;
  hideOnSmall?: boolean;
  tooltipField?: string;
  smallColumn?: boolean;
  width?: string;
  hideLabel?: boolean;
  imageClass?: string;
  currency?: string;

  rowMethod?: string;
  rowMethodInEditMode?: string;

  sticky?: boolean;
  stickyEnd?: boolean;

  editable?: boolean;
  editFormKey?: string;
  parentFormGroup?: string;
  editFormType?: 'string' | 'number' | 'datepicker' | 'boolean' | 'autocomplete' | 'custom' | 'select';
  autocompleteOptionsKey?: string;
  optionsKey?: string;
  optionLabelKey?: string;
  optionValueKey?: string;
  noOptionAddText?: string;
  noOptionAddIcon?: string;
  noOptionAddAction?: string;

  borders?: {
    left?: boolean | string;
    right?: boolean | string;
    top?: boolean | string;
    bottom?: boolean | string;
  }

  headers?: {
    level1: string;
    level1Span: number;
    level2: string;
    level2Span: number;
    level3: string;
    level3Span: number;
  }
}
