import Loader from '@/utils/Loader';
import React, { useState } from 'react'

const useFullPageLoader = () => {
    const [loading, setLoading] = useState(false);
  return [
    loading ? <Loader /> : null,
    () => setLoading(true),
    () => setLoading(false),
  ]
}

export default useFullPageLoader
