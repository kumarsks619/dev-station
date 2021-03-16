import React from 'react'

import Loader from '../layout/Loader'
import notFoundLotte from '../../assets/notFound.json'

const NotFound = () => {
    return <Loader lotteData={notFoundLotte} />
}

export default NotFound
