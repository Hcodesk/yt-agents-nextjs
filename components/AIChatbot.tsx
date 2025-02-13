"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactMarkdown from "react-markdown"

interface AIChatbotProps {
  model: string
}

export default function AIChatbot({ model }: AIChatbotProps) {
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; content: string }>>([
    {
      role: "user",
      content: "Peux-tu me faire un résumé de la vidéo ?",
    },
    {
      role: "ai",
      content: `Bien sûr ! Voici un résumé de la vidéo :

* Point clé 1
* Point clé 2
* Point clé 3

La vidéo aborde principalement les thèmes suivants...`,
    },
  ])

  return (
    <ScrollArea className="h-[400px]">
      {messages.map((message, index) => (
        <div key={index} className="mb-6">
          <div className="font-medium mb-2 text-sm text-gray-600">{message.role === "user" ? "You:" : "AI:"}</div>
          <div
            className={`${
              message.role === "user"
                ? "bg-gray-100 rounded-lg p-3"
                : "bg-[#f4fbf4] border border-[#e5f5e5] rounded-lg p-4"
            }`}
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
  )
}

