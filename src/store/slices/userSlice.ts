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

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ _id: string; name: string; email: string; role: string }>) => {
            const { _id, name, email, role } = action.payload;
            state._id = _id;
            state.name = name;
            state.email = email;
            state.role = role; 
        },
        setSeller: (state, action: PayloadAction<boolean>) => {
            state.isSeller = action.payload; 
        }
    },
});

export const { setUser, setSeller } = userSlice.actions;
export default userSlice.reducer;
