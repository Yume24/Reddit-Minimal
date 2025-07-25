import SearchForm from "../features/search/SearchForm"
import logo from "../logo.svg"
import { Link } from "react-router"

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md bg-white rounded-top shadow">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img width="48" height="48" src={logo} alt="blue reddit logo" />
          <span className="d-none d-sm-inline h3 mb-0 mx-3">
            <span className="text-primary">Reddit</span>Minimal
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse my-3 justify-content-end"
          id="navbarSupportedContent"
        >
          <SearchForm />
        </div>
      </div>
    </nav>
  )
}
