import { useVideoStore } from "../store/videoStore"
import { Eye, Clock } from "lucide-react"
import Image from "next/image"

export default function VideoDetails() {
  const { videoDetails } = useVideoStore()

  if (!videoDetails) return null

  return (
    <div className="flex items-start space-x-4">
      <div className="w-40 h-24 relative flex-shrink-0">
        <Image
          src={videoDetails.thumbnailUrl || "/placeholder.svg"}
          alt={videoDetails.title}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="flex-grow">
        <h2 className="text-xl font-semibold mb-2">{videoDetails.title}</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{videoDetails.duration}</span>
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            <span>{videoDetails.views.toLocaleString()} views</span>
          </div>
        </div>
      </div>
    </div>
  )
}

