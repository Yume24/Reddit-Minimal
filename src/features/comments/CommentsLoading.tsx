export default function CommentsLoading() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="placeholder-glow w-25 my-3">
          <span className="placeholder col-6"></span>
          <p className="m-0 placeholder-glow">
            <span className="placeholder mx-1 col-7"></span>
            <span className="placeholder mx-1 col-4"></span>
            <span className="placeholder mx-1 col-4"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder mx-1 col-8"></span>
          </p>
          <span className="placeholder col-6"></span>
        </div>
      ))}
    </>
  )
}
