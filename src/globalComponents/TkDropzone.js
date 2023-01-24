import Dropzone from "react-dropzone";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const TkDropzone = forwardRef(function TkDropzone(
  { onDrop, children, accept, multiple, maxSize, className, maxFiles, uploading, disabled, ...rest },
  ref
) {
  return (
    <Dropzone
      onDrop={onDrop}
      // accept={accept} // don't pass accept to accept all files
      multiple={multiple}
      // maxSize={maxSize}  // not passing max size as it dosent gives error on max size exceed, insted manually handel this in onDrop function
      className={className}
      disabled={disabled}
      // maxFiles={maxFiles} // handel maunally in onDrop function
      ref={ref}
      {...rest}
    >
      {({ getRootProps, getInputProps }) => (
        <div className="dropzone dz-clickable">
          {uploading ? (
            <h3 className="text-muted text-center mt-3">Uploading Files...</h3>
          ) : (
            <div className="dz-message needsclick" {...getRootProps()}>
              <input {...getInputProps()} />
              {children}
            </div>
          )}
          {Number(maxFiles) ? ( // 0 will not send this div, but we will not accept 0 files, insted we will disabale it in that case
            <div className="text-center text-muted">
              <small>Max {maxFiles} files are accepted at once.</small>
            </div>
          ) : null}
        </div>
      )}
    </Dropzone>
  );
});

TkDropzone.propTypes = {
  onDrop: PropTypes.func,
  accept: PropTypes.object,
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
  className: PropTypes.string,
  uploading: PropTypes.bool,
};

export default TkDropzone;
