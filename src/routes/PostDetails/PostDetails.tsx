import Post from "../../features/posts/Post.tsx"
import { useParams } from "react-router"
import { useAppSelector } from "../../app/hooks.ts"
import { postSelectorById } from "../../features/posts/postsSlice.ts"
import PostsError from "../../features/posts/PostsError.tsx"
import BackButton from "../../components/BackButton.tsx"

export default function PostDetails() {
  const id = Number(useParams().id)
  const post = useAppSelector(state => postSelectorById(state, id))
  return (
    <div className="col">
      <div className="bg-white shadow rounded-bottom p-5 pt-3">
        <BackButton />
        {post ? (
          <Post post={post} index={0} fadeText={false} />
        ) : (
          <PostsError />
        )}
      </div>
    </div>
  )
}
