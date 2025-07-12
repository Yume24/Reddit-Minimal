import './App.css'
import Navbar from "./components/Navbar";
import TrendingCommunities from "./features/communities/TrendingCommunities.tsx"
import Posts from "./features/posts/Posts.tsx"

function App() {
  return (<>
    <div className="container-fluid mb-5 app">
      <div className="row my-3">
        <div className="col">
          <Navbar/>
        </div>
      </div>
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
    </div>
  </>)
}

export default App
