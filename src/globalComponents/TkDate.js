import classNames from "classnames";
import Flatpickr from "react-flatpickr";
import PropTypes from "prop-types";
import { Label } from "reactstrap";
import { forwardRef } from "react";

const TkDate = forwardRef(function Date(
  { name, id, labelName, labelClassName, requiredStarOnLabel, placeholder, innerRef, className, children, ...other },
  ref
) {
  return (
    <>
      {labelName && id ? (
        <Label htmlFor={id} className={labelClassName}>
          {labelName}
          {requiredStarOnLabel ? <span className="text-danger"> *</span> : null}
        </Label>
      ) : null}
      <Flatpickr
        name={name}
        id={id}
        placeholder={placeholder}
        ref={ref || innerRef} // kept innerRef for backward compatibility
        // we are not defining value ,onchange ,onopen or other functons as passing undef to them id raising the error , unlike other react components
        // value={value} // value is required
        // onChange={onChange} // onChange is required
        className={classNames(className, "form-control", "tk-date-select-field")}
        {...other}
      />
    </>
  );
});

TkDate.propTypes = {
  className: PropTypes.string,
  // options: PropTypes.object,
  // onChange: PropTypes.func.isRequired,
  // value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired,
  placeholder: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
  name: PropTypes.string,
  id: PropTypes.string,
};

export default TkDate;
