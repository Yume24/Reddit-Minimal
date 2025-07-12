import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import trendingCommunitiesSlice from "../features/communities/trendingCommunitiesSlice";
import postsSlice from "../features/posts/postsSlice.ts"

const rootReducer = combineSlices(trendingCommunitiesSlice, postsSlice);
export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer
})

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
