import moment from "moment/moment"
import PostMedia from "./PostMedia.tsx"
import { motion } from "motion/react"
import type { Post } from "./postsSlice.ts"
import styles from "./posts.module.css"

export default function Post({
  post,
  index,
  fadeText = true,
}: {
  post: Post
  index: number
  fadeText?: boolean
}) {
  return (
    <motion.div
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
        <p className={`card-text ${fadeText ? styles.fadingText : ""}`}>
          {post.text}
        </p>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chat"
              viewBox="0 0 16 16"
            >
              <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
            </svg>
            <p className="m-0 mx-1">{post.comments}</p>
          </div>
          <p className="m-0 text-secondary fst-italic">
            {moment.unix(post.createdAt).format("DD-MM-YYYY HH:mm")}
          </p>
        </div>
      </div>
      <PostMedia
        title={post.title}
        videoUrl={post.videoUrl}
        imageUrl={post.imageUrl}
      />
    </motion.div>
  )
}
