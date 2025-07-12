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
import CommunityImage from "./CommunityImage.tsx"
import TrendingCommunitiesError from "./TrendingCommunitiesError.tsx"

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
            <TrendingCommunitiesError
              handleClick={() => void dispatch(fetchTrendingCommunities())}
            />
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
                    <CommunityImage
                      name={community.name}
                      imageSrc={community.imageSrc}
                    />
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
