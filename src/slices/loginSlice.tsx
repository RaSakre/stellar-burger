import { loginUserApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCookie } from "../utils/cookie";

interface TUserState {
  isAuthChecking: boolean, 
  isAuthenticated: boolean,
  user: {
		email:string,
		password:string,
	}| null ,
  loginUserError: undefined | string 
  loginUserRequest: boolean,
}

interface IUserData {
		email: string,
		password:string,
}

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async ({email, password}:IUserData) => {
		const data =  await loginUserApi({email, password})
		setCookie('accessToken', data.accessToken);
		localStorage.setItem('refreshToken', data.refreshToken)
		return data.user
	}
)

const initialState: TUserState = {
  isAuthChecking: false, 
  isAuthenticated: false,
  user: {
		email: '',
		password: '',
	},
  loginUserError: '',
  loginUserRequest: false,
};

const loginSlice = createSlice({
	name: 'loginSlice',
	initialState,
	reducers: {
		logOutParam: (state, action) => {
			state.isAuthenticated = action.payload
		},
		setAuthState: (state, action) => {
      state.isAuthenticated = action.payload
    }
	},
	extraReducers: (builder) => {
		builder
					.addCase(loginUser.pending, (state) => {
				state.loginUserRequest = true;
				state.loginUserError = ''
					})
		.addCase(loginUser.rejected, (state, action) => {
				state.loginUserRequest = false;
				state.loginUserError = action.error.message;
				state.isAuthChecking = true;
		})
		.addCase(loginUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.loginUserRequest = false;
				state.isAuthenticated = true;
				state.isAuthChecking = true;
		})
}
})

export const {logOutParam, setAuthState} = loginSlice.actions

export default loginSlice.reducer