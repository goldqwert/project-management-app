import axios from 'axios'
import { getCookie, setCookie } from 'typescript-cookie'
import { getToken, showError } from '../slices/signin-slice'
import { getTokenFromCookie } from '../../common/helper'
import HttpService from '../../services/http-service'

export const sendingSignInData = (signInData: Pick<UserType, 'login' | 'password'>) => {
    return async (dispatch) => {
        dispatch(showError(null))
        const sendRequestSignIn = async () => {
            const response = await HttpService.signin(signInData)
            if (!response) {
                throw new Error('Bad token recieved')
            }

            const { token } = response
            setCookie('jwt', token, { expires: 1 })
            dispatch(getToken(token))
            return token
        }
        try {
            await sendRequestSignIn()
        } catch (error) {
            dispatch(showError('User login already exists!"'))
        }
    }
}
