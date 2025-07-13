import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import RootLayout from "./routes/RootLayout.tsx"
import Home from "./routes/Home/Home.tsx"
import PostDetails from "./routes/PostDetails/PostDetails.tsx"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index={true} element={<Home />} />
    <Route path="post/:id" element={<PostDetails />} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
