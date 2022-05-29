import { AppDispatch } from '../../types/types'
import { setCookie } from 'typescript-cookie'
import {   signUp,
  signIn,
  logOut,
  updateUser,
  deleteUser,
  showError } from '../slices/AuthSlice'
import HttpService from '../../services/http-service'


export const signInAction = (signUpData: Omit<UserType, 'id'>) => {
    return async (dispatch:AppDispatch) => {
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

