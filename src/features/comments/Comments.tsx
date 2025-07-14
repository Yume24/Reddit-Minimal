import type { Comment } from "./commentsSlice.ts"
import CommentDisplay from "./Comment.tsx"

export default function Comments({ comments }: { comments: Comment[] }) {
  return (
    <div className="list-group">
      {comments.map((comment, index) => (
        <CommentDisplay
          key={index}
          comment={comment}
        />
      ))}
    </div>
  )
}
