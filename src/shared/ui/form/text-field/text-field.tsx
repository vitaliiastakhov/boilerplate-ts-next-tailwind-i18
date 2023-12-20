import type { InputHTMLAttributes } from 'react';

import {
  createElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';

import { Icon } from '../../icon';
import { Label } from '../label/label';
import { ValidationText } from '../validation-text';
import classes from './text-field.module.css';

type ValidationStatus = 'invalid' | 'warning';

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>
{
  size?: 'medium' | 'large';
  validation?: { status: ValidationStatus; text?: string };
  mode?: 'clear';
  multiline?: boolean | number;
  focused?: boolean;
  fullWidth?: boolean;
  selectTextOnFocus?: boolean;
  suggestion?: string;
  onChange?(value: string, id: string): void;
  label?: string;
  description?: string;
  resize?: boolean;
  leftIcon?: React.ComponentType;
  rightIcon?: React.ComponentType;
}

export const TextField = (props: TextFieldProps) => {
  const {
    label,
    size = 'medium',
    id: idProp,
    validation,
    multiline = false,
    focused,
    value = '',
    suggestion,
    selectTextOnFocus,
    onChange,
    onFocus,
    onBlur,
    children,
    description,
    readOnly = false,
    disabled = false,
    fullWidth = false,
    mode,
    required,
    resize,
    leftIcon,
    rightIcon,
    ...restProps
  } = props;

  const validationStatus: ValidationStatus | undefined = !disabled
    ? validation?.status
    : undefined;

  const [focus, setFocus] = useState(Boolean(focused));
  const normalizedValue = suggestion ? suggestion : value;
  const uniqId = useId();
  const id = idProp ?? uniqId;

  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const getInputRef = useCallback(() => {
    return multiline ? textAreaRef.current : inputRef.current;
  }, [multiline]);

  useEffect(() => {
    const input = getInputRef();
    if (!input || focused === undefined) return;
    focused ? input.focus() : input.blur();
  }, [focused, getInputRef]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(event.currentTarget.value, id);
  }

  function handleOnBlur(event: React.FocusEvent<HTMLInputElement>) {
    setFocus(false);

    if (onBlur) {
      onBlur(event);
    }
  }

  const handleOnFocus = (
    event: React.FocusEvent<HTMLElement> | React.MouseEvent<HTMLInputElement>,
  ) => {
    if (disabled) {
      return;
    }
    setFocus(true);

    if (selectTextOnFocus && !suggestion) {
      const input = getInputRef();
      input?.select();
    }

    if (onFocus) {
      onFocus(event as React.FocusEvent<HTMLInputElement>);
    }
  };

  function handleClickChild() {
    if (disabled || focus) {
      return;
    }
    setFocus(true);
    getInputRef()?.focus();
  }

  const inputClassName = clsx(
    classes[`text-input`],
    classes[`text-input-size-${size}`],
    { [classes[`text-input-mode-${mode ?? 'clear'}`]]: mode },
    { [classes[`text-input-size-multiline-${size}`]]: multiline },
    {
      [classes[`text-input-validation-${validationStatus ?? 'invalid'}`]]:
        (!readOnly || disabled) && validationStatus,
      [classes[`text-input-focus`]]: focus,
      [classes[`text-input-disabled`]]: disabled,
      [classes[`text-input-read-only`]]: readOnly,
    },
  );

  const inputInnerClassName = clsx(
    classes.input,
    classes[`input-size-${size}`],
    {
      [classes[`input-multiline-size-${size}`]]: multiline,
      [classes[`input-resize`]]: resize,
    },
  );

  const input = createElement(multiline ? 'textarea' : 'input', {
    id,
    ref: multiline ? textAreaRef : inputRef,
    value: normalizedValue,
    className: inputInnerClassName,
    disabled,
    readOnly,
    rows: getRows(multiline),
    onChange: handleChange,
    onFocus: handleOnFocus,
    onClick: handleClickChild,
    onBlur: handleOnBlur,
    ...restProps,
  });

  const leftIconMarkup = (leftIcon && !multiline)
    ? <Icon icon={leftIcon} size={size} />
    : null;
  const inputMarkup = input;

  const rightIconMarkup = (rightIcon && !multiline)
    ? <Icon icon={rightIcon} size={size} />
    : null;

  return (
    <div
      className={clsx(classes['text-field'], {
        [classes['full-width']]: fullWidth,
      })}
    >
      {label
        && (
          <Label
            required={required}
            className={classes.label}
            label={label}
            disabled={disabled}
            onClick={handleClickChild}
            size={size}
          />
        )}
      <div className={inputClassName}>
        {leftIconMarkup}
        {inputMarkup}
        {rightIconMarkup}
      </div>
      {validation?.text && (
        <ValidationText
          className={classes.validation}
          validation={{ status: validationStatus, text: validation.text }}
          onClick={handleClickChild}
        />
      )}
    </div>
  );
};

function getRows(multiline?: boolean | number) {
  if (!multiline) return undefined;

  const MIN_ROW = 1;

  return typeof multiline === 'number' ? multiline : MIN_ROW;
}
