import { createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { removeCookie } from 'typescript-cookie'

export interface LogoutState {
    userData: UserType
}

const initialState: LogoutState = {
    userData: {
        id: '',
        name: '',
        login: '',
        password: '',
    },
}
const logout = createSlice({
    name: 'logout',
    initialState,
    reducers: {
        clearUserData() {
            removeCookie('id')
            removeCookie('jwt')
            // в dispatch прописать storage.removeItem('persist:root')
        },
    },
})
export const { clearUserData } = logout.actions
export default logout.reducer
