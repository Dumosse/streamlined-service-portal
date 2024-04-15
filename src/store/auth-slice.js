import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  username: "",
  password: "",
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
  },
});

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    console.log("Inside loginUser: ", username, password);
    try {
      const requestData = {
        username: username,
        password: password,
      };
      const response = await axios.post(
        "http://localhost:5000/login",
        requestData
      );
      console.log(requestData);
      dispatch(authActions.setMessage(response.data.message));
      alert("Login Successful!");
    } catch (error) {
      if (error.response) {
        dispatch(authActions.setMessage(error.response.data.message));
      } else {
        dispatch(authActions.setMessage("An error occurred while logging in."));
      }
      console.error("Login error: ", error);
    }
  };
};

export const authActions = authSlice.actions;

export default authSlice;