/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { componentsX } from '../../internal/FeatureFlags';
import WarningFilled16 from '@carbon/icons-react/lib/warning--filled/16';

const { prefix } = settings;

const TextInput = React.forwardRef(
  (
    {
      labelText,
      className = `${prefix}--text__input`,
      id,
      placeholder,
      type,
      onChange,
      onClick,
      hideLabel,
      invalid,
      invalidText,
      helperText,
      light,
      ...other
    },
    ref
  ) => {
    const textInputProps = {
      id,
      onChange: evt => {
        if (!other.disabled) {
          onChange(evt);
        }
      },
      onClick: evt => {
        if (!other.disabled) {
          onClick(evt);
        }
      },
      placeholder,
      type,
      ref,
    };

    const errorId = id + '-error-msg';
    const textInputClasses = classNames(`${prefix}--text-input`, className, {
      [`${prefix}--text-input--light`]: light,
      [`${prefix}--text-input--invalid`]: invalid,
    });
    const labelClasses = classNames(`${prefix}--label`, {
      [`${prefix}--visually-hidden`]: hideLabel,
      [`${prefix}--label--disabled`]: other.disabled,
    });
    const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: other.disabled,
    });

    const label = labelText ? (
      <label htmlFor={id} className={labelClasses}>
        {labelText}
      </label>
    ) : null;

    const error = invalid ? (
      <div className={`${prefix}--form-requirement`} id={errorId}>
        {invalidText}
      </div>
    ) : null;

    const input = invalid ? (
      <input
        {...other}
        {...textInputProps}
        data-invalid
        aria-invalid
        aria-describedby={errorId}
        className={textInputClasses}
      />
    ) : (
      <input {...other} {...textInputProps} className={textInputClasses} />
    );

    const helper = helperText ? (
      <div className={helperTextClasses}>{helperText}</div>
    ) : null;

    const textInputWrapperClasses = classNames(`${prefix}--form-item`, {
      [`${prefix}--text-input-wrapper`]: componentsX,
    });

    return (
      <div className={textInputWrapperClasses}>
        {label}
        {helper}
        {componentsX ? (
          <div
            className={`${prefix}--text-input__field-wrapper`}
            data-invalid={invalid || null}>
            {invalid && (
              <WarningFilled16
                className={`${prefix}--text-input__invalid-icon`}
              />
            )}
            {input}
          </div>
        ) : (
          input
        )}
        {error}
      </div>
    );
  }
);

TextInput.propTypes = {
  /**
   * Specify an optional className to be applied to the <input> node
   */
  className: PropTypes.string,

  /**
   * Optionally provide the default value of the <input>
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the <input> should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify a custom `id` for the <input>
   */
  id: PropTypes.string.isRequired,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Optionally provide an `onChange` handler that is called whenever <input>
   * is updated
   */
  onChange: PropTypes.func,

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * <input> is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the placeholder attribute for the <input>
   */
  placeholder: PropTypes.string,

  /**
   * Specify the type of the <input>
   */
  type: PropTypes.string,

  /**
   * Specify the value of the <input>
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.string,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * `true` to use the light version.
   */
  light: PropTypes.bool,
};

TextInput.defaultProps = {
  disabled: false,
  type: 'text',
  onChange: () => {},
  onClick: () => {},
  invalid: false,
  invalidText: '',
  helperText: '',
  light: false,
};

export default TextInput;
