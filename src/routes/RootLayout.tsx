import Navbar from "../components/Navbar.tsx"
import { Outlet } from "react-router"

export default function RootLayout() {
  return (
    <div className="container-fluid mb-5 app">
      <div className="row my-3">
        <div className="col">
          <Navbar />
        </div>
      </div>
      <main className="row gx-3 gy-3">
        <Outlet />
      </main>
    </div>
  )
}
