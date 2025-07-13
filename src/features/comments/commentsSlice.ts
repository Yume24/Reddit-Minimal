import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store.ts"

export type Comment = {
  author: string
  content: string
  createdAt: number
}

type CommentsState = {
  comments: Comment[]
  isLoading: boolean
  hasError: boolean
}

type RedditAPIResponse = {
  data: {
    children: {
      data: {
        body: string
        author: string
        created_utc: number
      }
    }[]
  }
}[]

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  hasError: false,
}

function parseData(jsonData: RedditAPIResponse): Comment[] {
  return jsonData[1].data.children.map(comment => {
    return {
      author: comment.data.author,
      content: comment.data.body,
      createdAt: comment.data.created_utc,
    }
  })
}

export const fetchComments = createAsyncThunk<
  Comment[],
  string,
  {
    rejectValue: string
  }
>("comments/fetchComments", async (postLink, { rejectWithValue }) => {
  const url = `https://www.reddit.com${postLink.slice(0, -1)}`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      return rejectWithValue("Error fetching comments")
    }
    const json = (await response.json()) as RedditAPIResponse
    return parseData(json)
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(`Error: ${error.message}`)
    }
    return rejectWithValue("Unknown error occurred")
  }
})

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchComments.pending, state => {
      state.isLoading = true
    })
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload
      state.isLoading = false
      state.hasError = false
    })
    builder.addCase(fetchComments.rejected, state => {
      state.isLoading = false
      state.hasError = true
    })
  },
})

export default commentsSlice
export const commentsSelector = (state: RootState) => state.comments
