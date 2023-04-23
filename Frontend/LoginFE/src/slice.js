import { createSlice } from '@reduxjs/toolkit'



export const counterSlice = createSlice({
  name: 'counter',
  initialState:{
    username:'',
        
    
  },
  reducers: {
    addDetails: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log('from slice', action)
      state.username = action.payload
      
    }
   
  },
})

// Action creators are generated for each case reducer function
export const { addDetails } = counterSlice.actions

export default counterSlice.reducer