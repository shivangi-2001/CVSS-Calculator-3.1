import { configureStore } from '@reduxjs/toolkit'
import CVSSReducer from './Slice'
// ...

export const store = configureStore({
  reducer: {
    cvss: CVSSReducer
  },
})

export type AppStore = typeof store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch