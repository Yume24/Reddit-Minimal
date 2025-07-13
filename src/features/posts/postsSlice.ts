import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { RootState } from "../../app/store.ts"

export type Post = {
  id: number
  title: string
  author: string
  subredditName: string
  videoUrl?: string | null
  imageUrl?: string
  text: string | null
  comments: number
  createdAt: number
  link: string
}

type PostsState = {
  posts: Post[]
  isLoading: boolean
  hasError: boolean
}
type RedditAPIResponse = {
  data: {
    children: {
      data: {
        title: string
        author_fullname: string
        subreddit_name_prefixed: string
        selftext: string | null
        num_comments: number
        created_utc: number
        permalink: string
        media: null | {
          reddit_video?: {
            fallback_url: string
          }
        }
        preview?: {
          images: {
            source: {
              url: string
            }
          }[]
        }
      }
    }[]
  }
}
const initialState: PostsState = {
  posts: [],
  isLoading: false,
  hasError: false,
}

function parseData(jsonData: RedditAPIResponse): Post[] {
  return jsonData.data.children.map((post, index) => {
    return {
      id: index,
      title: post.data.title,
      author: post.data.author_fullname,
      subredditName: post.data.subreddit_name_prefixed,
      text: post.data.selftext,
      comments: post.data.num_comments,
      createdAt: post.data.created_utc,
      link: post.data.permalink,
      videoUrl: post.data.media?.reddit_video?.fallback_url.replaceAll(
        "&amp;",
        "&",
      ),
      imageUrl: post.data.preview?.images[0].source.url.replaceAll(
        "&amp;",
        "&",
      ),
    }
  })
}

export const fetchPosts = createAsyncThunk<
  Post[],
  string,
  { rejectValue: string }
>("posts/fetchPosts", async (query, { rejectWithValue }) => {
  const url = query
    ? `https://www.reddit.com/${query.replace(" ", "%20")}`
    : "https://www.reddit.com/r/popular.json"
  try {
    const response = await fetch(url)
    if (!response.ok) {
      return rejectWithValue("Error loading posts")
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

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.isLoading = true
      state.hasError = false
    })
    builder.addCase(fetchPosts.rejected, state => {
      state.isLoading = false
      state.hasError = true
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false
      state.hasError = false
      state.posts = action.payload
    })
  },
})
export const postsSelector = (state: RootState) => state.posts
export const postSelectorById = (state: RootState, id: number) =>
  state.posts.posts.find(post => post.id === id)
export default postsSlice
