import type React from "react"

export default function TrendingCommunitiesError({
  handleClick,
}: {
  handleClick: React.MouseEventHandler
}) {
  return (
    <>
      <p className="text-danger text-center fw-bold">
        There was an error loading communities!
      </p>
      <div className="text-center">
        <button className="btn btn-outline-primary" onClick={handleClick}>
          Try again
        </button>
      </div>
    </>
  )
}
