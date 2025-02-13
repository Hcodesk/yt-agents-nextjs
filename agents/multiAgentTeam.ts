import { useVideoStore } from "../store/videoStore"

export async function processVideo(videoUrl: string) {
  const { setVideoDetails, setTranscription, setFormattedTranscription } = useVideoStore.getState()

  // Agent 1: Get video info
   const { videoUrl } = {useVideoStore.getState()}
   
  // Agent 2: Fetch audio
  const audioBuffer = await fetchAudioFromYoutube(videoUrl)

  // Agent 3: Transcribe audio
  const transcription = await transcribeAudio(audioBuffer)
  setTranscription(transcription)

  // Agent 4: Format transcription to Markdown
  const formattedTranscription = await markdownFormatter(transcription)
  setFormattedTranscription(formattedTranscription)
}

