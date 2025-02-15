"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import TranscriptionViewer from "../components/TranscriptionViewer"
import VideoDetails from "@/components/videoDetails"
import AIChatbot from "../components/AIChatbot"
import ChatHistorySidebar from "../components/ChatHistorySidebar"
import { useVideoStore } from "../store/videoStore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function Home() {
  const [videoUrl] = useState("https://www.youtube.com/watch?v=example")
/*   const [transcription] = useState(`Voici la transcription de la vidéo...
  
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`) */

  const { setVideoDetails } = useVideoStore()
  const [model, setModel] = useState("gpt-3.5-turbo")
  const [apiKey, setApiKey] = useState("")
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false)
  const [input, setInput] = useState("")

  useEffect(() => {
    setVideoDetails({
      title: "Sample YouTube Video",
      duration: "10:30",
      views: 1234567,
      thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    })
  }, [setVideoDetails])

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate and store the API key securely
    console.log("API Key updated:", apiKey)
    setIsApiKeyModalOpen(false)
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle chat submission logic here
    console.log("Chat submitted:", input)
    setInput("")
  }

  return (
    <div className="flex h-screen">
      <ChatHistorySidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">YouAgent</h1>
            <div className="flex items-center gap-2">
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="claude-v1">Claude v1</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isApiKeyModalOpen} onOpenChange={setIsApiKeyModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Change API Key</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleApiKeySubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="apiKey">API Key</Label>
                      <Input
                        id="apiKey"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        type="password"
                        placeholder="Enter your API key"
                      />
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card className="mb-6">
            <div className="p-4">
              <Input value={videoUrl} disabled className="bg-gray-100 text-gray-600 mb-4" />
              <VideoDetails />
            </div>
          </Card>

          <Card className="mb-6">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Transcription</h2>
              <TranscriptionViewer />
            </div>
          </Card>

          <div className="mb-6">
            <AIChatbot model={model} />
          </div>

          <div className="mb-6">
            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question about the video..."
                className="flex-grow"
              />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

