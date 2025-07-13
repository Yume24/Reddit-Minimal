import { useEffect, useState } from "react"
import { useAppDispatch } from "../../app/hooks.ts"
import { fetchTrendingCommunities } from "./trendingCommunitiesSlice.ts"
import { trendingCommunitiesSelector } from "./trendingCommunitiesSlice.ts"
import { useAppSelector } from "../../app/hooks.ts"
import TrendingCommunitiesLoading from "./TrendingCommunitiesLoading.tsx"
import { fetchPosts } from "../posts/postsSlice.ts"
import {
  searchSelector,
  setIsSearch,
  setSearch,
} from "../search/searchSlice.ts"
import TrendingCommunitiesError from "./TrendingCommunitiesError.tsx"
import Community from "./Community.tsx"

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
                <Community
                  community={community}
                  activeCategory={activeCategory}
                  isSearch={isSearch}
                  index={index}
                  handleClick={() => {
                    setActiveCategory(community.name)
                    dispatch(setIsSearch(false))
                    dispatch(setSearch(""))
                    void dispatch(fetchPosts(`${community.name}.json`))
                  }}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
