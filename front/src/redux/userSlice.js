// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // Initialiser les informations utilisateur à partir du stockage local ou de sessionStorage
  userName: '',
  firstName: '',
  lastName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      //const { userName, firstName, lastName } = action.payload;
      state.userName = action.payload.userName;
      state.firstName = action.payload.firstName || state.firstName;
      state.lastName = action.payload.lastName || state.lastName;
    },
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
    //deconection
    //reinitialiser les informations de l'utilisateur
    logout: (state) => {
        state.userName = ''
        state.firstName = ''
        state.lastName = ''
    }
  },
});

export const { setUserProfile, updateUserName, logout } = userSlice.actions;
export default userSlice.reducer;
