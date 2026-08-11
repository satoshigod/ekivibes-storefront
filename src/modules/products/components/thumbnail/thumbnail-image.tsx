"use client"
import React from "react"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

export default function ThumbnailImage({ src }: { src: string }) {
  const [broken, setBroken] = React.useState(false)

  if (broken) {
    return (
      <div className="w-full h-full absolute inset-0 flex items-center justify-center">
        <PlaceholderImage size={16} />
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className="absolute inset-0 w-full h-full object-contain object-center"
      draggable={false}
      onError={() => setBroken(true)}
    />
  )
}
