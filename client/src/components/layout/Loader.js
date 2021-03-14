import React from 'react'
import Lottie from 'react-lottie'

import loadingData from '../../assets/loading.json'

const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    }

    return <Lottie options={defaultOptions} height={200} width={200} />
}

export default Loader
