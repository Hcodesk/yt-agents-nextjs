"use client"

import { useState } from "react"
import { useVideoStore } from "../store/videoStore"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Youtube } from "lucide-react"

interface VideoInputFormProps {
  onSubmit: (url: string) => void
  disabled: boolean
}

export default function VideoInputForm({ onSubmit, disabled }: VideoInputFormProps) {
  const [inputUrl, setInputUrl] = useState("")
  const { setVideoUrl } = useVideoStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setVideoUrl(inputUrl)
    onSubmit(inputUrl)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2">
        <Youtube className="h-6 w-6 text-red-500" />
        <Input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter YouTube video URL"
          disabled={disabled}
          className="flex-grow"
        />
      </div>
      <Button type="submit" disabled={disabled} className="w-full bg-purple-600 hover:bg-purple-700">
        Transcribe Video
      </Button>
    </form>
  )
}

