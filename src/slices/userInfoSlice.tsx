import { getUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IUserInfo {
  user: {
    email: string;
    name: string;
  };
}

const initialState: IUserInfo = {
  user: {
    email: '',
    name: ''
  }
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  return await getUserApi();
});

const userInfoSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    deleteUserData: (state, action) => {
      state.user = action.payload;
    },
    changeUserInfo: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {})
      .addCase(fetchUser.rejected, (state, action) => {})
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  }
});

export const { deleteUserData, changeUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
