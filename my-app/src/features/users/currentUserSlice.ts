import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MiembroType } from "../../types";

export interface CurrentUserState {
  value?: MiembroType;
}

const initialState: CurrentUserState = {
  value: undefined,
};

export const CurrentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<MiembroType>) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentUser } = CurrentUserSlice.actions;

export default CurrentUserSlice.reducer;
