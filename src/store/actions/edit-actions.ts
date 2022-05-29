import axios from 'axios'
import { showError } from '../slices/edit-slice'
import { getTokenFromCookie } from '../../common/helper'
import HttpService from '../../services/http-service'

export const editProfileData = (user: UserType) => {
    return async (dispatch) => {
        dispatch(showError(null))
        const sendEditData = async () => {
            const response = await HttpService.updateUser(user)
            if (!response) {
                throw new Error('User not update')
            }
            return response
        }
        try {
            await sendEditData()
        } catch (e) {
            dispatch(showError('Something went wrong!'))
        }
    }
}
