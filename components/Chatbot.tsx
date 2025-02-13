"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Settings2 } from "lucide-react"
import ReactMarkdown from "react-markdown"

export default function Chatbot() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; content: string }>>([
    {
      role: "user",
      content: "When should I plant each vegetable in zone 4?",
    },
    {
      role: "ai",
      content: `To determine when to plant each vegetable in zone 4, it is important to know the average last frost date and the number of frost-free days in your area. This will help you determine the appropriate planting times for each vegetable.

Here are some general guidelines for planting common vegetables in zone 4:

Early Spring Vegetables
* Asparagus: Plant crowns in early spring (April-May).
* Peas: Plant as soon as the soil can be worked in early spring.
* Radishes: Plant as soon as the soil can be worked in early spring.
* Spinach: Plant as soon as the soil can be worked in early spring.

Late Spring/Early Summer Vegetables
* Beans (bush and pole): Plant after the last frost date (late spring).
* Beets: Plant after the last frost date (late spring).
* Carrots: Plant after the last frost date (late spring).
* Cabbage: Start seeds`,
    },
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
            <span className="text-white text-xs">AI</span>
          </div>
          <span className="font-medium">LLM Markdown</span>
        </div>
        <Button variant="ghost" size="icon">
          <Settings2 className="h-4 w-4" />
        </Button>
      </div>

      <Card className="mb-4">
        <CardContent className="p-0">
          <ScrollArea className="h-[500px] p-4">
            {messages.map((message, index) => (
              <div key={index} className="mb-6">
                <div className="font-medium mb-2 text-sm text-gray-600">{message.role === "user" ? "You:" : "AI:"}</div>
                <div
                  className={`${message.role === "ai" ? "bg-[#f4fbf4] border border-[#e5f5e5] rounded-md p-4" : ""}`}
                >
                  {message.role === "ai" ? (
                    <ReactMarkdown className="prose prose-sm max-w-none">{message.content}</ReactMarkdown>
                  ) : (
                    <p>{message.content}</p>
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="pr-24"
        />
        <div className="absolute right-2 bottom-2 text-xs">
          <a href="#" className="text-blue-500 hover:underline">
            Change OpenAI API Key
          </a>
        </div>
      </form>
    </div>
  )
}

