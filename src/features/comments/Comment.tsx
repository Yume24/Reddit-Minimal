import type { Comment } from "./commentsSlice.ts"
import Comments from "./Comments.tsx"
import moment from "moment"
import ReactMarkdown from "react-markdown"

export default function Comment({ comment }: { comment: Comment }) {
  return (
    <div className="list-group-item border-top-0 border-bottom-0 border-end-0 border-secondary">
      <p className="text-secondary fst-italic">{comment.author}</p>
      <ReactMarkdown>{comment.content}</ReactMarkdown>
      <p className="text-secondary fst-italic">
        {moment.unix(comment.createdAt).format("DD-MM-YYYY HH:mm")}
      </p>
      {comment.replies.length > 0 ? (
        <Comments comments={comment.replies} />
      ) : null}
    </div>
  )
}
