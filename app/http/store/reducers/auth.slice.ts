import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import Cookies from "js-cookie";
import {TYPE_LOGIN} from "../../../constants";

interface IState {
	loading: boolean,
	signInError: boolean,
	is2FAModal: boolean,
	signIn2FALoading: boolean,
	signIn2FAError: boolean,
	user: any,
	accessToken?: string,
	isAuthentication: boolean,
	typeLogin: number
}

const initialState: IState = {
	loading: false,
	signInError: false,
	is2FAModal: false,
	signIn2FALoading: false,
	signIn2FAError: false,
	user: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo') + '') : null,
	accessToken: Cookies.get('accessToken'),
	isAuthentication: !!Cookies.get('userInfo'),
	typeLogin: TYPE_LOGIN.email
}

interface ISignInSuccessData {
	twoFactor: boolean,
}

interface ISignIn2FASuccessData {

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
			state.typeLogin = action.payload.twoFactor ? TYPE_LOGIN.google : TYPE_LOGIN.email
			state.is2FAModal = true
		},
		signInFail: (state: IState) => {
			state.loading = false
			state.isAuthentication = false
			state.signInError = true
		},
		signIn2FA: (state: IState, action: PayloadAction<string>) => {
			state.signIn2FALoading = true
			state.signIn2FAError = false
		},
		signIn2FASuccess: (state: IState, action: PayloadAction<ISignIn2FASuccessData>) => {
			state.signIn2FALoading = false
			state.isAuthentication = true
			state.is2FAModal = false
		},
		signIn2FAFail: (state: IState) => {
			state.signIn2FALoading = false
			state.isAuthentication = false
			state.signIn2FAError = true
			state.is2FAModal = false
		},
		setIs2FAModal: (state: IState, action) => {
			state.is2FAModal = action.payload
		},
		setTypeLogin: (state: IState, action) => {
			state.typeLogin = action.payload
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
	setIs2FAModal,
	setTypeLogin
} = authSlice.actions

export default authSlice.reducer
