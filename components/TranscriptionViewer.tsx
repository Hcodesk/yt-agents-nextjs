interface TranscriptionViewerProps {
    transcription: string
  }
  
  export default function TranscriptionViewer({ transcription }: TranscriptionViewerProps) {
    return (
      <div className="prose prose-sm max-w-none">
        <h2 className="text-lg font-semibold mb-4">Transcription hhh</h2>
        <div className="whitespace-pre-wrap">{transcription}</div>
      </div>
    )
  }
  
  