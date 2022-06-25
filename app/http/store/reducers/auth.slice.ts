import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import Cookies from "js-cookie";

interface IState {
	loading: boolean,
	signInError: boolean,
	user: any,
	accessToken?: string,
	isAuthentication: boolean
}

const initialState: IState = {
	loading: false,
	signInError: false,
	user: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo') + '') : null,
	accessToken: Cookies.get('accessToken'),
	isAuthentication: !!Cookies.get('userInfo'),
}

interface ISignInSuccessData {
	twoFactor: boolean,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		signIn: (state: IState, action: PayloadAction<string>) => {
			state.loading = true
			state.signInError = false
		},
		signInSuccess: (state: IState, action: PayloadAction<ISignInSuccessData>) => {
			state.loading = false
		},
		signInFail: (state: IState) => {
			state.loading = false
			state.isAuthentication = false
			state.signInError = true
		},
	},
})

export const {
	signIn,
	signInSuccess,
	signInFail,
	signIn2FA,
	signIn2FASuccess,
	signIn2FAFail,
} = authSlice.actions

export default authSlice.reducer
