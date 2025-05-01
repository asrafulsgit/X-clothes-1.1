
import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
     name : 'user',
     initialState : {
          favorites    : 0,
          carts        : 0,
          isLoggedIn  : false,
          loading      : true,
          message : '',
          isReadyForEmailVerify : false,     // for forgot password
          email : '',                         // for forgot password
          isReadyForResetPassword : false,
          emailVerficationCode : '',
          isCheckout : false
     },
     reducers : {
          setFavorites(state,action){
               state.favorites = action.payload;
          },
          setCarts(state,action){
               state.carts = action.payload;
          },
          setMessage(state,action){
               state.message = action.payload;
          },
          setIsLoggedIn(state,action){
               state.isLoggedIn = action.payload;
          },
          setLoading(state,action){
               state.loading = action.payload;
          },
          setIsReadyForEmailVerify(state,action){
               state.isReadyForEmailVerify = action.payload;
          },
          setEmail(state,action){
               state.email = action.payload;
          },
          setIsReadyForResetPassword(state,action){
               state.isReadyForResetPassword = action.payload;
          },
          setEmailVerificationCode(state,action){
               state.emailVerficationCode = action.payload;
          },     
          setIsCheckout(state,action){
               state.isCheckout = action.payload;
          },     
     }
})

export const {setFavorites,setMessage,setCarts,setIsLoggedIn,
     setLoading,setIsReadyForEmailVerify,setEmail,setIsReadyForResetPassword,setEmailVerificationCode,setIsCheckout} = userSlice.actions;
export default userSlice.reducer;