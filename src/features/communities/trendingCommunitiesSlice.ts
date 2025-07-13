import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store"

export type Community = {
  name: string
  imageSrc: string
  url: string
}
type TrendingCommunitiesState = {
  trendingCommunities: Community[]
  isLoading: boolean
  hasError: boolean
  activeCommunity: string
}
type RedditAPIResponse = {
  data: {
    children: {
      data: {
        display_name_prefixed: string
        url: string
        icon_img: string
      }
    }[]
  }
}

function parseData(jsonData: RedditAPIResponse): Community[] {
  return jsonData.data.children.map(community => {
    return {
      name: community.data.display_name_prefixed,
      url: community.data.url,
      imageSrc: community.data.icon_img || "",
    }
  })
}

export const fetchTrendingCommunities = createAsyncThunk<
  Community[],
  undefined,
  { rejectValue: string }
>(
  "trendingCommunities/fetchTrendingCommunities",
  async (_, { rejectWithValue }) => {
    const url = "https://www.reddit.com/subreddits/popular.json"
    try {
      const response = await fetch(url)
      if (!response.ok) {
        return rejectWithValue("Error loading communities")
      }
      const json = (await response.json()) as RedditAPIResponse
      return parseData(json)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(`Error: ${error.message}`)
      }
      return rejectWithValue("Unknown error occurred")
    }
  },
)

const initialState: TrendingCommunitiesState = {
  trendingCommunities: [],
  isLoading: false,
  hasError: false,
  activeCommunity: "",
}

const trendingCommunitiesSlice = createSlice({
  name: "trendingCommunities",
  initialState,
  reducers: {
    setActiveCommunity: (state, action: { payload: string }) => {
      state.activeCommunity = action.payload
    },
    clearActiveCommunity: state => {
      state.activeCommunity = initialState.activeCommunity
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTrendingCommunities.pending, state => {
      state.isLoading = true
      state.hasError = false
    })
    builder.addCase(fetchTrendingCommunities.fulfilled, (state, action) => {
      state.isLoading = false
      state.hasError = false
      state.trendingCommunities = action.payload
    })
    builder.addCase(fetchTrendingCommunities.rejected, state => {
      state.isLoading = false
      state.hasError = true
    })
  },
})
export const trendingCommunitiesSelector = (state: RootState) =>
  state.trendingCommunities
export const { setActiveCommunity, clearActiveCommunity } =
  trendingCommunitiesSlice.actions
export default trendingCommunitiesSlice
