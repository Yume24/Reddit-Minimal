import { useEffect, useState } from "react"
import { useAppDispatch } from "../../app/hooks.ts"
import { fetchTrendingCommunities } from "./trendingCommunitiesSlice.ts"
import { trendingCommunitiesSelector } from "./trendingCommunitiesSlice.ts"
import { useAppSelector } from "../../app/hooks.ts"
import TrendingCommunitiesLoading from "./TrendingCommunitiesLoading.tsx"
import { motion } from "motion/react"
import { fetchPosts } from "../posts/postsSlice.ts"
import {
  searchSelector,
  setIsSearch,
  setSearch,
} from "../search/searchSlice.ts"

export default function TrendingCommunities() {
  const dispatch = useAppDispatch()
  const [activeCategory, setActiveCategory] = useState("")
  useEffect(() => {
    void dispatch(fetchTrendingCommunities())
  }, [dispatch])

  const { trendingCommunities, isLoading, hasError } = useAppSelector(
    trendingCommunitiesSelector,
  )
  const { isSearch } = useAppSelector(searchSelector)

  return (
    <div className="container p-3">
      <div className="row">
        <div className="col">
          <h3 className="h3">Trending Communities</h3>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {isLoading ? (
            <TrendingCommunitiesLoading />
          ) : hasError ? (
            <>
              <p className="text-danger text-center fw-bold">
                There was an error loading communities!
              </p>
              <div className="text-center">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => void dispatch(fetchTrendingCommunities())}
                >
                  Try again
                </button>
              </div>
            </>
          ) : (
            <ul className="list-group">
              {trendingCommunities.map((community, index) => (
                <motion.li
                  key={community.name}
                  className="list-group-item p-0"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <div
                    onClick={() => {
                      setActiveCategory(community.name)
                      dispatch(setIsSearch(false))
                      dispatch(setSearch(""))
                      void dispatch(fetchPosts(`${community.name}.json`))
                    }}
                    role="button"
                    className={`btn ${activeCategory === community.name && !isSearch ? "bg-primary text-white" : ""} d-flex align-items-center`}
                  >
                    {community.imageSrc ? (
                      <img
                        className="rounded-pill"
                        width="32"
                        height="32"
                        src={community.imageSrc}
                        alt={`${community.name} icon`}
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        width="32"
                        height="32"
                        fill="currentColor"
                        className="bi bi-question-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                      </svg>
                    )}

                    <p className="m-0 mx-3">{community.name}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
