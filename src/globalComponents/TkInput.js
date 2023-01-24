import { Input, Label } from "reactstrap";
import PropTypes from "prop-types";
import useSwitch from "@react-hook/switch";
import { forwardRef } from "react";
import classNames from "classnames";

const TkInput = forwardRef(function TkInput(
  {
    name,
    id,
    value,
    onChange,
    className,
    type,
    placeholder,
    disabled,
    required,
    valid,
    invalid,
    defaultValue,
    labelName,
    labelClassName,
    requiredStarOnLabel,
    ...rest
  },
  ref
) {
  // State for hiding or showing password
  const [hidden, toggleHidden] = useSwitch(true);

  return (
    <>
      {labelName && id ? (
        <Label htmlFor={id} className={labelClassName}>
          {labelName}
          {requiredStarOnLabel ? <span className="text-danger"> *</span> : null}
        </Label>
      ) : null}
      {type === "password" ? (
        <div className="position-relative">
          {/*IMP: the below input is repeated twwice, so if you want to chnage something then consider chnagingt it in both places */}
          <Input
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            className={classNames(className,'form-control-password-input')}
            innerRef={ref}
            type={hidden ? "password" : "text"}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            invalid={invalid}
            valid={valid}
            defaultValue={defaultValue}
            {...rest}
          />
          <button
            className="btn position-absolute end-0 top-0 text-decoration-none text-muted"
            type="button"
            // it will toggle the hidden state value
            onClick={toggleHidden}
          >
            {hidden ? (
              <i className="ri-eye-fill align-middle"></i>
            ) : (
              <i className="ri-eye-off-fill align-middle"></i>
            )}
          </button>
        </div>
      ) : (
        <Input
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          className={className}
          innerRef={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          invalid={invalid}
          valid={valid}
          defaultValue={defaultValue}
          {...rest}
        />
      )}
    </>
  );
});

TkInput.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  lableName: PropTypes.string,
  // value could be string or number or date or time or datetime or any thing other that i dont' know, so not adding type check for that
  // value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  valid: PropTypes.bool,
  requiredStarOnLabel: PropTypes.bool,
};

// TkInput.defaultProps = {
// reactstrap is by default adding form-control class on input tag and form-label class to label tag, so no need to add it
// className: "form-control",
// labelClassName: "form-label",
// };

export default TkInput;
