import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { fetchPosts, postsSelector } from "./postsSlice.ts"
import PostsLoading from "./PostsLoading.tsx"
import { searchSelector } from "../search/searchSlice.ts"
import PostsError from "./PostsError.tsx"
import Post from "./Post.tsx"

export default function Posts() {
  const dispatch = useAppDispatch()
  const { posts, isLoading, hasError } = useAppSelector(postsSelector)
  const { isSearch, searchTerm } = useAppSelector(searchSelector)
  useEffect(() => {
    void dispatch(fetchPosts(""))
  }, [dispatch])

  return (
    <>
      {isSearch ? <h3>Search results for: "{searchTerm}"</h3> : null}
      {isLoading ? (
        <PostsLoading />
      ) : hasError ? (
        <PostsError />
      ) : (
        <>
          {posts.map((post, index) => (
            <Post post={post} index={index} key={index} />
          ))}
        </>
      )}
    </>
  )
}
