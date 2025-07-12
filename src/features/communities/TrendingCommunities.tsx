import { useEffect } from "react"
import { useAppDispatch } from "../../app/hooks.ts"
import { fetchTrendingCommunities } from "./trendingCommunitiesSlice.ts"
import { trendingCommunitiesSelector } from "./trendingCommunitiesSlice.ts"
import { useAppSelector } from "../../app/hooks.ts"
import TrendingCommunitiesLoading from "./TrendingCommunitiesLoading.tsx"
import { motion } from "motion/react";

export default function TrendingCommunities() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    void dispatch(fetchTrendingCommunities())
  }, [dispatch])

  const { trendingCommunities, isLoading, hasError } = useAppSelector(
    trendingCommunitiesSelector,
  )

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
            <p>Error!</p>
          ) : (
            <ul className="list-group">
              {trendingCommunities.map((community, index) => (
                <motion.li key={community.name} className="list-group-item d-flex align-items-center"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05, }}>
                  <img
                    className="rounded-pill"
                    width="32"
                    height="32"
                    src={community.imageSrc}
                    alt={`${community.name} icon`}
                  />
                  <p className="m-0 mx-3">{community.name}</p>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
