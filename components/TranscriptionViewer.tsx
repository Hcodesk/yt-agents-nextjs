import { useVideoStore } from "../store/videoStore"
import ReactMarkdown from "react-markdown"

interface TranscriptionViewerProps {
    transcription: string
  }
  
  export default function TranscriptionViewer(/* { transcription }: TranscriptionViewerProps */) {
    const { formattedTranscription } = useVideoStore()

    if (!formattedTranscription) return null

    return (
      <div className="prose prose-sm max-w-none">
        <h2 className="text-lg font-semibold mb-4">Transcription hhh</h2>
        <div className="whitespace-pre-wrap">
          <ReactMarkdown>{formattedTranscription}</ReactMarkdown>
        </div>
      </div>
    )
  }
  
  