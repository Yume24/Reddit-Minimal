import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store.ts"

export type Comment = {
  author: string
  content: string
  createdAt: number
  replies: Comment[]
}

type CommentsState = {
  comments: Comment[]
  isLoading: boolean
  hasError: boolean
}

type RedditAPIResponse = {
  data: {
    children: {
      kind: string
      data: {
        body: string
        author: string
        created_utc: number
        replies: RedditAPIResponse | string
      }
    }[]
  }
}

type InitialRedditAPIResponse = RedditAPIResponse[]

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  hasError: false,
}

function parseData(jsonData: RedditAPIResponse | string): Comment[] {
  if (typeof jsonData === "string") {
    return []
  }
  return jsonData.data.children
    .filter(child => child.kind === "t1")
    .map(comment => {
      return {
        author: comment.data.author,
        content: comment.data.body,
        createdAt: comment.data.created_utc,
        replies: parseData(comment.data.replies),
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
  const url = `https://www.reddit.com${postLink.slice(0, -1)}.json`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      return rejectWithValue("Error fetching comments")
    }
    const json = (await response.json()) as InitialRedditAPIResponse
    return parseData(json[1])
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
