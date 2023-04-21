import React from 'react'
import ReactSwitch from 'react-switch'

const ToggleButton = ({
    checked,
    handleChange
}) => {
  return (
    <>
       <ReactSwitch
        checked={checked}
        onChange={handleChange}
        offColor="#E5E5E5"
        onColor="#00C48C"
        checkedIcon={false}
        uncheckedIcon={false}
        height={20}
        width={40}
        />
    </>
  )
}

export default ToggleButton
