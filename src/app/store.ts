import { combineSlices, configureStore } from "@reduxjs/toolkit"
import trendingCommunitiesSlice from "../features/communities/trendingCommunitiesSlice"
import postsSlice from "../features/posts/postsSlice.ts"
import searchSlice from "../features/search/searchSlice.ts"
import commentsSlice from "../features/comments/commentsSlice.ts"

const rootReducer = combineSlices(
  trendingCommunitiesSlice,
  postsSlice,
  searchSlice,
  commentsSlice
)
export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
})

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
