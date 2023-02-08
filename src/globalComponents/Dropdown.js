import TkCard, { TkCardBody } from '@/globalComponents/TkCard'
import TkSelect from '@/globalComponents/TkSelect'
import React from 'react'

const Dropdown = ({data, defaultValue}) => {
  return (
    <>
    {/* <TkCard> */}
        {/* <TkCardBody> */}
        <TkSelect
          id="destinationName"
          name="destinationName"
          options={data}
          defaultValue={defaultValue}
          maxMenuHeight="80px"
        />
        {/* </TkCardBody> */}
    {/* </TkCard> */}
    </>
  )
}

export default Dropdown
