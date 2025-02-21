import { configureStore } from "@reduxjs/toolkit";

import userReducer from './UserSlice'

const userInfoStore = configureStore({
     reducer : {
          authInfo : userReducer
     }
})

export default userInfoStore;