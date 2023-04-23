import { configureStore } from '@reduxjs/toolkit'
import counter from './slice'

export const store = configureStore({
  reducer: {
    counter : counter
  },
})