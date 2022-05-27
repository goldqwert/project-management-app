import React from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorView from './Error-View'

const ErrorContainer = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/', { replace: true })
    }
    return <ErrorView handleClick={handleClick} />
}

export default ErrorContainer
