import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import {
  fetchTrendingCommunities,
  setActiveCommunity,
  trendingCommunitiesSelector,
} from "./trendingCommunitiesSlice.ts"
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
  const { trendingCommunities, isLoading, hasError, activeCommunity } =
    useAppSelector(trendingCommunitiesSelector)
  const { isSearch } = useAppSelector(searchSelector)
  useEffect(() => {
    if (trendingCommunities.length === 0) {
      void dispatch(fetchTrendingCommunities())
    }
  }, [dispatch, trendingCommunities])
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
                  key={index}
                  community={community}
                  activeCommunity={activeCommunity}
                  isSearch={isSearch}
                  index={index}
                  handleClick={() => {
                    dispatch(setActiveCommunity(community.name))
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
