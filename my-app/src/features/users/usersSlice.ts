import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MiembroType } from "../../types";

export interface CurrentUserState {
  value?: MiembroType[];
}

const initialState: CurrentUserState = {
  value: undefined,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    saveUsers: (state, action: PayloadAction<MiembroType[]>) => {
      state.value = action.payload;
    },
  },
});

export const { saveUsers } = userSlice.actions;

export default userSlice.reducer;
