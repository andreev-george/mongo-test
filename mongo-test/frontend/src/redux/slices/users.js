import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await axios.get("/users");
  return data;
});

const initialState = {
  users: {
    list: [],
    status: "loading",
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.users.list = [];
      state.users.status = "loading";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users.list = action.payload;
      state.users.status = "loaded";
    },
    [fetchUsers.rejected]: (state) => {
      state.users.list = [];
      state.users.status = "error";
    },
  },
});

export const usersReducer = usersSlice.reducer;
