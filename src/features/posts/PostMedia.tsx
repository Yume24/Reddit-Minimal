import styles from "./posts.module.css"

export default function PostMedia({
  imageUrl,
  videoUrl,
  title,
}: {
  imageUrl: string | null
  videoUrl: string | null
  title: string
}) {
  return (
    <>
      {imageUrl && !videoUrl ? (
        <img
          className={`card-img-bottom ${styles.content}`}
          src={imageUrl}
          alt={`thumbnail of "${title}"`}
        />
      ) : null}
      {videoUrl ? (
        <video
          className={`card-img-bottom ${styles.content}`}
          src={videoUrl}
          controls
        ></video>
      ) : null}
    </>
  )
}
