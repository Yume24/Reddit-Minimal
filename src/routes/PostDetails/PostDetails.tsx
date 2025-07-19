import Post from "../../features/posts/Post.tsx"
import { ScrollRestoration, useParams } from "react-router"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { postSelectorById } from "../../features/posts/postsSlice.ts"
import PostsError from "../../features/posts/PostsError.tsx"
import BackButton from "../../components/BackButton.tsx"
import Comments from "../../features/comments/Comments.tsx"
import {
  commentsSelector,
  fetchComments,
} from "../../features/comments/commentsSlice.ts"
import CommentsLoading from "../../features/comments/CommentsLoading.tsx"
import CommentsError from "../../features/comments/CommentsError.tsx"
import { useEffect } from "react"

export default function PostDetails() {
  const id = Number(useParams().id)
  const post = useAppSelector(postSelectorById(id))
  const dispatch = useAppDispatch()
  const comments = useAppSelector(commentsSelector)
  useEffect(() => {
    if (post) {
      void dispatch(fetchComments(post.link))
    }
  }, [dispatch, post])
  return (
    <div className="col">
      <ScrollRestoration />
      <div className="bg-white shadow rounded-bottom p-5 pt-3">
        <BackButton />
        {post ? (
          <Post post={post} index={0} fadeText={false} />
        ) : (
          <PostsError />
        )}
        <h3 className="h3">Comments:</h3>
        {comments.isLoading ? (
          <CommentsLoading />
        ) : comments.hasError ? (
          <CommentsError />
        ) : (
          <Comments comments={comments.comments} />
        )}
      </div>
    </div>
  )
}
