import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  exists: boolean;
}

const initialState: UserState = {
  exists: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserExists: (state, action: PayloadAction<boolean>) => {
      state.exists = action.payload;
    },
  },
});

export const { setUserExists } = userSlice.actions;
export default userSlice.reducer;
