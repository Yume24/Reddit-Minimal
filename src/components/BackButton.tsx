import { useNavigate } from "react-router"

export default function BackButton() {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => void navigate(-1)}
      className="btn btn-outline-primary mb-3"
    >
      Go back
    </button>
  )
}
