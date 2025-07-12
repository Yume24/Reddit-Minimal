import { useEffect } from "react"
import { useAppDispatch } from "../../app/hooks.ts"
import { fetchTrendingCommunities } from "./trendingCommunitiesSlice.ts"
import { trendingCommunitiesSelector } from "./trendingCommunitiesSlice.ts"
import { useAppSelector } from "../../app/hooks.ts"

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
          {isLoading ? <p>Loading</p> : ( (hasError ? <p>Error</p> :
            <ul className="list-group">
              {trendingCommunities.map((community) =>
                (<li key={community.name} className="list-group-item">
                    {community.imageSrc && <img width="32" height="32" src={community.imageSrc} alt={`${community.name} icon`} />}
                  {community.name}
                </li>))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
