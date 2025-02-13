import {Agent , Task , Team } from "kaibanjs"
import {NextResponse} from "next/server"
import { useVideoStore } from "@/store/videoStore"
import {Tool} from "@langchain/core/tools"

//définition Agent 1 : Get video info & audioUrl
const {videoUrl} =  useVideoStore.getState()

const infoAgent = new Agent ({
    name : "videoFetcher",
    role : "Get youtube video info based on the video url & audio url",
    goal : "Get video info & audio url",
    background : "Experimented in youtube api data extraction",
    execute : async () => {

    }
})

//custom tool to get video info
