import React, { ReactNode } from "react"
import "./background.scss"

export default function Background(props: BackgroundProps) {
  const { children, topMovieThumbnail } = props
  return <div className="page-background" style={{ backgroundImage: `url(${topMovieThumbnail})` }}>
    <div className="page-background__children">
      {children}
    </div>
  </div>
}

interface BackgroundProps {
  children: ReactNode
  topMovieThumbnail: string
}