import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  _id: string;
  name: string;
  email: string;
  isSeller: boolean;
  role: string;
}

const initialState: UserState = {
  _id: '',
  name: '',
  email: '',
  role: '',
  isSeller: false,
};
interface SetUserPayload {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUserPayload>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    setSeller: (state, action: PayloadAction<boolean>) => {
      state.isSeller = action.payload;
    },
    userLogOut: (state) => {
      state._id = '';
      state.name = '';
      state.email = '';
      state.role = '';
    },
  },
});

export const { setUser, userLogOut, setSeller } = userSlice.actions;
export default userSlice.reducer;
