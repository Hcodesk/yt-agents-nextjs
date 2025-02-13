import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const chatHistory = [
  { id: 1, title: "Chat about video 1" },
  { id: 2, title: "Discussion on topic 2" },
  { id: 3, title: "Analysis of video 3" },
  // Add more chat history items as needed
]

export default function ChatHistorySidebar() {
  return (
    <div className="w-64 h-screen bg-gray-100 p-4">
      <h2 className="text-lg font-semibold mb-4">Chat History</h2>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        {chatHistory.map((chat) => (
          <Button key={chat.id} variant="ghost" className="w-full justify-start mb-2 text-left">
            {chat.title}
          </Button>
        ))}
      </ScrollArea>
    </div>
  )
}

