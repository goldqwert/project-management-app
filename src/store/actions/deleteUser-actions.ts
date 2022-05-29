import axios from 'axios'
import { showError, deleteUser } from '../slices/deleteUser-slice'
import { getTokenFromCookie } from '../../common/helper'
import HttpService from '../../services/http-service'

export const deleteUserProfile = (userId:string) => {
    return async (dispatch) => {
        dispatch(showError(null))
        const deleteDataUser = async () => {
            const response = await HttpService.deleteUser(userId)
            console.log(response)
            if (!response) {
                throw new Error('Something went wrong!')
            }
            return response
        }
        try {
            await deleteDataUser()
        } catch (error) {
            dispatch(showError('Something went wrong!'))
        }
    }
}
