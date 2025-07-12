import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { fetchPosts, postsSelector } from "./postsSlice.ts"
import styles from "./posts.module.css"
import PostsLoading from "./PostsLoading.tsx"
import { motion } from "motion/react"
import { searchSelector } from "../search/searchSlice.ts"

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
        <p className="text-danger text-center fw-bold">
          There was an error loading posts!
        </p>
      ) : (
        <>
          {posts.map((post, index) => (
            <motion.div
              key={index}
              className="card mb-5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="card-header">{post.subredditName}</div>
              <div className="card-body">
                <h5 className="card-title fw-bold">{post.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {post.author}
                </h6>
              </div>
              {post.imageUrl && !post.videoUrl ? (
                <img
                  className={`card-img-bottom ${styles.content}`}
                  src={post.imageUrl}
                  alt={`thumbnail of "${post.title}"`}
                />
              ) : null}
              {post.videoUrl ? (
                <video
                  className={`card-img-bottom ${styles.content}`}
                  src={post.videoUrl}
                  controls
                ></video>
              ) : null}
            </motion.div>
          ))}
        </>
      )}
    </>
  )
}
