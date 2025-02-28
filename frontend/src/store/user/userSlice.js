import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 users: [
  {fullName: "ntnael taye",
   email: "natitaye316@gmail.com",
   password: "12345556", 
  },
 ]
}

console.log(initialState);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.users.push(action.payload);
      console.log(action);
    },
  },
});


export const { createUser } = userSlice.actions;
export default userSlice.reducer;
