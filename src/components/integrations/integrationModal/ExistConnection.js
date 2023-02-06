import TkCard, { TkCardBody } from '@/globalComponents/TkCard'
import TkRow, { TkCol } from '@/globalComponents/TkRow'
import TkSelect from '@/globalComponents/TkSelect'
import React from 'react'

const ExistConnection = () => {
  return (
    <>
    <TkRow>
        <TkCol lg={12}>
            <TkCard>
                <TkCardBody>
                    <TkSelect
                        labelName="Select Connection"
                    />
                </TkCardBody>
            </TkCard>
        </TkCol>
    </TkRow>
    </>
  )
}

export default ExistConnection
