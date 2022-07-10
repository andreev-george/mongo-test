import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/users";
import { authReducer } from "./slices/auth";

const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
  },
});

export default store;
