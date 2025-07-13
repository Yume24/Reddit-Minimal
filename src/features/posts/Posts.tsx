import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { fetchPosts, postsSelector } from "./postsSlice.ts"
import PostsLoading from "./PostsLoading.tsx"
import { searchSelector } from "../search/searchSlice.ts"
import PostsError from "./PostsError.tsx"
import Post from "./Post.tsx"
import { Link } from "react-router"

export default function Posts() {
  const dispatch = useAppDispatch()
  const { posts, isLoading, hasError } = useAppSelector(postsSelector)
  const { isSearch, searchTerm } = useAppSelector(searchSelector)
  useEffect(() => {
    if (posts.length === 0) {
      void dispatch(fetchPosts(""))
    }
  }, [dispatch, posts])

  return (
    <>
      {isSearch ? (
        <h3 className="h3 mb-4">Search results for: "{searchTerm}"</h3>
      ) : null}
      {isLoading ? (
        <PostsLoading />
      ) : hasError ? (
        <PostsError />
      ) : (
        <>
          {posts.map((post, index) => (
            <Link
              to={`/post/${index.toString()}`}
              key={index}
              style={{ textDecoration: "none" }}
            >
              <Post post={post} index={index} />
            </Link>
          ))}
        </>
      )}
    </>
  )
}
