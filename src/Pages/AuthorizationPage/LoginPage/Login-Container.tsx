import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { useForm } from 'react-hook-form'
import { dispatchStore, RootState } from '../../../types/types'
import LoginView from './Login-View'
import { sendingSignInData } from '../../../store/actions/signIn-actions'
import { LoginState } from './Login-Types'

const LoginContainer = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { error } = useSelector((state: RootState) => state.signUp)
    const { login, password } = useSelector((state: RootState) => state.signIn)

    const {
        handleSubmit,
        formState: { errors },
        register,
        reset,
    } = useForm<LoginState>({ mode: 'onChange' })

    const handleFormSubmit = () => {
        reset()
        dispatchStore(sendingSignInData({ login, password }))
        navigate('/main')
    }
    return (
        <LoginView
            dispatch={dispatch}
            error={error}
            errors={errors}
            handleFormSubmit={handleFormSubmit}
            handleSubmit={handleSubmit}
            register={register}
        />
    )
}
export default LoginContainer
