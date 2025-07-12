export default function PostsLoading() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="card mb-5 placeholder-glow">
          <div className="card-header">
            <div className="placeholder" style={{ width: 100 }}></div>
          </div>
          <div className="card-body">
            <h5 className="card-title placeholder w-50"></h5>
            <br />
            <h6 className="w-25 card-subtitle mb-2 text-body-secondary placeholder"></h6>
            <div className="placeholder w-100" style={{ height: 500 }}></div>
          </div>
        </div>
      ))}
    </>
  )
}
