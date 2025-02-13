import { getVideoInfo } from "../utils/getVideoInfo"
import { fetchAudioFromYoutube } from "../utils/fetchAudioFromYoutube"
import { transcribeAudio } from "../utils/transcribeAudio"
import { markdownFormatter } from "../utils/markdownFormatter"
import { useVideoStore } from "../store/videoStore"

export async function processVideo(videoUrl: string) {
  const { setVideoDetails, setTranscription, setFormattedTranscription } = useVideoStore.getState()

  // Agent 1: Get video info
  const videoInfo = await getVideoInfo(videoUrl)
  setVideoDetails(videoInfo)

  // Agent 2: Fetch audio
  const audioBuffer = await fetchAudioFromYoutube(videoUrl)

  // Agent 3: Transcribe audio
  const transcription = await transcribeAudio(audioBuffer)
  setTranscription(transcription)

  // Agent 4: Format transcription to Markdown
  const formattedTranscription = await markdownFormatter(transcription)
  setFormattedTranscription(formattedTranscription)
}

