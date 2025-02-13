import { create } from "zustand"

interface VideoDetails {
  title: string
  duration: string
  views: number
  thumbnailUrl: string
}

interface VideoStore {
  videoUrl: string | null
  videoDetails: VideoDetails | null
  transcription: string | null
  formattedTranscription: string | null
  setVideoUrl: (url: string) => void
  setVideoDetails: (details: VideoDetails) => void
  setTranscription: (transcription: string) => void
  setFormattedTranscription: (formattedTranscription: string) => void
}

export const useVideoStore = create<VideoStore>((set) => ({
  videoUrl: null,
  videoDetails: null,
  transcription: null,
  formattedTranscription: null,
  setVideoUrl: (url) => set({ videoUrl: url }),
  setVideoDetails: (details) => set({ videoDetails: details }),
  setTranscription: (transcription) => set({ transcription }),
  setFormattedTranscription: (formattedTranscription) => set({ formattedTranscription }),
}))

