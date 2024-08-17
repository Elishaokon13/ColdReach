import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("userDetails", JSON.stringify(action.payload));
      }
    },
    clearUser: (state) => {
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("userDetails");
      }
    },
    loadUserFromStorage: (state) => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("userDetails");
        if (storedUser) {
          state.user = JSON.parse(storedUser);
        }
      }
    },
  },
});

export const { setUser, clearUser, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
