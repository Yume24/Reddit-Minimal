import './App.css'
import Navbar from "./components/Navbar";
import TrendingCommunities from "./features/communities/TrendingCommunities.tsx"

function App() {
  return (<>
    <div className="container-fluid app">
      <div className="row my-3">
        <div className="col">
          <Navbar/>
        </div>
      </div>
      <div className="row gx-3 gy-3">
        <div className="col-12 col-lg-9">
          <div className="bg-white shadow rounded-bottom">
            s
          </div>
        </div>
        <div className="col-12 col-lg-3">
          <div className="bg-white shadow rounded-bottom">
            <TrendingCommunities />
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default App
