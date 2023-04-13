import { useRouter } from 'next/router'
import React from 'react'

const Token = () => {
    const { query } = useRouter()
  return (
    <div>
      <h4>data from url</h4>
      <p>{query.id}</p>
      <p>{query.token}</p>
    </div>
  )
}

export default Token
