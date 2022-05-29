import axios from 'axios'
import { setCookie } from 'typescript-cookie'
import { showError, getUserData } from '../slices/signUp-slice'
import HttpService from '../../services/http-service'

export let savedData

export const sendingFormSignUp = (signUpData: Omit<UserType, 'id'>) => {
    return async (dispatch) => {
        dispatch(showError(null))
        const sendRequest = async () => {
            const response = await HttpService.signup(signUpData)
            console.log(response, signUpData)
            if (!response) {
                throw new Error('Bad user credentials')
            }

            savedData = setCookie('id', response.id, { expires: 1 })
            return response
        }
        try {
            const allData = await sendRequest()
            dispatch(getUserData(allData))
        } catch (error) {
            dispatch(showError('Something went wrong!'))
        }
    }
}
