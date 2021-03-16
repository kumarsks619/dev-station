import React from 'react'
import Lottie from 'react-lottie'

import loadingData from '../../assets/loading.json'

const Loader = ({ lotteData }) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    }

    const customOptions = {
        loop: true,
        autoplay: true,
        animationData: lotteData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    }

    return (
        <Lottie
            options={lotteData ? customOptions : defaultOptions}
            height={200}
            width={200}
        />
    )
}

export default Loader
