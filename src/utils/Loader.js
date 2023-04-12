import TkLoader from '@/globalComponents/TkLoader'
import React from 'react'

const Loader = () => {
  return (
    <div className='fp-container'>
       {/* <div > */}
        <TkLoader className="fp-loader" />
       {/* </div> */}
    </div>
  )
}

export default Loader
