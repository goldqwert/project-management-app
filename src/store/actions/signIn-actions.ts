import axios from 'axios'
import { getCookie, setCookie } from 'typescript-cookie'
import { getToken, showError } from '../slices/signin-slice'
import { getTokenFromCookie } from '../../common/helper'

export const sendingSignInData = (signInData) => {
    return async (dispatch) => {
        dispatch(showError(null))
        const sendRequestSignIn = async () => {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getTokenFromCookie()}`,
                    'Access-Control-Allow-Origin': '*',
                },
            }
            const response = await axios.post(
                'https://fathomless-savannah-49484.herokuapp.com/signin',
                signInData,
                options
            )
            if (!response) {
                throw new Error(response.data?.message)
            }

            const { token } = response.data
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
