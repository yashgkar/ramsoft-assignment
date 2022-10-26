import { combineReducers, configureStore } from "@reduxjs/toolkit"
import homePageReducer from "../pages/Homepage/store/reducer"

const rootReducer = combineReducers({
	homePage: homePageReducer,
})

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== "production"
})

export const { dispatch } = store

export type RootState = ReturnType<typeof store.getState>

export default store