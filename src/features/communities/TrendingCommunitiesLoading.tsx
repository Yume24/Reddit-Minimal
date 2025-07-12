export default function TrendingCommunitiesLoading() {
  return (
    <ul className="list-group">
      {Array.from({ length: 10 }).map((_, index) => (
        <li
          key={index}
          className="list-group-item d-flex align-items-center placeholder-glow"
        >
          <div
            className="placeholder rounded-pill"
            style={{ width: 32, height: 32 }}
          ></div>
          <p
            className="placeholder placeholder-glow m-0 mx-3"
            style={{ width: "75%" }}
          ></p>
        </li>
      ))}
    </ul>
  )
}
