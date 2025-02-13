import { useVideoStore } from "../store/videoStore"
import ReactMarkdown from "react-markdown"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default function MarkdownViewer() {
  const { formattedTranscription } = useVideoStore()

  if (!formattedTranscription) return null

  return (
    <Card className="shadow-md border-t-4 border-green-500">
      <CardHeader className="flex flex-row items-center space-x-2">
        <FileText className="h-6 w-6 text-green-500" />
        <CardTitle className="text-2xl font-bold text-green-700">Transcription</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          <ReactMarkdown>{formattedTranscription}</ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  )
}

