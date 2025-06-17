"use client"

import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Post } from "@/types/post"
import { renderToString } from "react-dom/server"
import Link from "next/link"


export type MapProps = {
  posts: Post[]
}

const Map = ({ posts }: MapProps) => {
  useEffect(() => {
    const map = L.map('map').setView(posts[0].position, 5);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    for (const post of posts) {
      var marker = L.marker(post.position).addTo(map);
      const htmlString = renderToString(<Link href={`/posts/${post.slug}`} className="text-blue-600 block">{post.title}</Link>)
      marker.bindPopup(htmlString);
    }
    return () => {
      map.remove();
    }
  }, [])
  return (
    <div className="h-[320px]" id="map" />
  )
}

export default Map;
