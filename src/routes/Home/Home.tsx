import Posts from "../../features/posts/Posts.tsx"
import TrendingCommunities from "../../features/communities/TrendingCommunities.tsx"

export default function Home() {
  return (
    <main className="row gx-3 gy-3">
      <div className="col-12 col-lg-9">
        <div className="bg-white shadow rounded-bottom p-5">
          <Posts />
        </div>
      </div>
      <div className="col-12 col-lg-3">
        <div className="bg-white shadow rounded-bottom">
          <TrendingCommunities />
        </div>
      </div>
    </main>
  )
}
