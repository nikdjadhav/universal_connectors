import PropTypes from "prop-types";
import classNames from "classnames";

function TkIcon({ name, className, size, color, style, children, ...rest }) {
  return (
    <i
      name={name}
      className={classNames(className, { [`color-${color}`]: Boolean(color) })}
      style={style}
      {...rest}
    >
      {children}
    </i>
  );
}

// exapmle how to use
// <TkIcon color="primary" className="ri-twitter-fill fs-16"/>

TkIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.oneOf(["primary", "secondary", "success", "danger", "warning", "info"]),
  style: PropTypes.object,
};

export default TkIcon;
