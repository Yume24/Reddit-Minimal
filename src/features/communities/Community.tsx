import CommunityImage from "./CommunityImage.tsx"
import { motion } from "motion/react"
import type { Community } from "./trendingCommunitiesSlice.ts"
import type React from "react"

export default function Community({
  community,
  handleClick,
  activeCommunity,
  isSearch,
  index,
}: {
  community: Community
  handleClick: React.MouseEventHandler
  activeCommunity: string
  isSearch: boolean
  index: number
}) {
  return (
    <motion.li
      key={community.name}
      className="list-group-item list-group-item-action p-0"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
    >
      <div
        onClick={handleClick}
        role="button"
        className={`btn ${activeCommunity === community.name && !isSearch ? "bg-primary text-white" : ""} d-flex align-items-center`}
      >
        <CommunityImage name={community.name} imageSrc={community.imageSrc} />
        <p className="m-0 mx-3 text-break">{community.name}</p>
      </div>
    </motion.li>
  )
}
