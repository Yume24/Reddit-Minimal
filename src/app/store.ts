import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import trendingCommunitiesSlice from "../features/communities/trendingCommunitiesSlice";
import postsSlice from "../features/posts/postsSlice.ts"
import searchSlice from "../features/search/searchSlice.ts"

const rootReducer = combineSlices(trendingCommunitiesSlice, postsSlice, searchSlice);
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
