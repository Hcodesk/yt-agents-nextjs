import {Agent , Task , Team } from "kaibanjs"
import {NextResponse} from "next/server"
import { useVideoStore } from "@/store/videoStore"
import {Tool, ToolParams} from "@langchain/core/tools"
import {z} from "zod"
import ytdl from "ytdl-core"
import fs from "fs"
import path from "path"

//définition Agent 1 : Get audio file using url
const audioAgent = new Agent ({
    name : "videoFetcher",
    role : "Get youtube audio url",
    goal : "Get audio url",
    background : "Experimented in youtube api data extraction",
    tools : [YtAudioTool],
    llmConfig : {
        provider : "google",
        model :  "gemini-1.5-flash-latest",
        apiKey : process.env.GOOGLE_API_KEY
    }
    }
)
//définition Task 1 : Get audio file using url
const audioTask = new Task ({
  title : "Get audio file using url",
  description : "fetch audio file from youtube url : {videoUrl} ",
  expectedOutput : "audio file",
  agent : audioAgent,
})


// Définition Agent 2 : Get video infos
const videoAgent = new Agent({
  name: "videoInfoFetcher",
  role: "Get youtube video info",
  goal: "Get video info",
  background: "Experimented in youtube api data extraction",
  tools: [VideoInfoTool],
  llmConfig: {
    provider: "google",
    model: "gemini-1.5-flash-latest",
    apiKey: process.env.GOOGLE_API_KEY,
  },
});

//task 2
const videoInfoTask = new Task ({
   title : "Get video infos using url",
   description : "fetch video informations from youtube url : {videoUrl} ",
   expectedOutput : "video informations object",
   agent : videoAgent
})


export class YtAudioTool extends Tool {

  async _call(input) {
    const videoUrl = input.videoUrl
    const { setVideoUrl } = useVideoStore.getState();
    setVideoUrl(videoUrl)
    try {
      const videoInfo = await ytdl(videoUrl, {filter: 'audioonly'})

      const writeStream = fs.createWriteStream('./')

      videoInfo.pipe(writeStream) 

	    } catch (error) {
      console.error(error)
      return null }
  }
}

//videoInfoTool
export class VideoInfoTool extends Tool {
  async _call(input) {
    const videoUrl = input.videoUrl
    const {setVideoDetails} = useVideoStore.getState()
    try {
      const videoInfo = await ytdl.getInfo(videoUrl);
      setVideoDetails(videoInfo)
      return videoInfo;
    } catch (error) {
      console.error("Error fetching video info:", error);
      throw new Error("Failed to fetch video info");
    }
  }
}

const youtubeTeam = new Team({
    name : "Youtube Team",
    agents : [audioAgent, videoAgent],
    task : [audioTask, videoInfoTask]
})

//logic 
export async function GET(req) {
   try {
      const {searchParams} = new URL(req.url)

      const videoUrl = searchParams.get("videoUrl") || "https://www.youtube.com/watch?v=UfbUCqiAEbs"

      const output = await youtubeTeam.start({videoUrl})

      if (output.status === "FINISHED" /* check kaiban js state management status */ ) {
        return NextResponse.json ({
            output : output.result
        })
   } else {
    
    return NextResponse.json({
        status : "FAILED",
        message : "Unable to generate blog post"
     })
   }
   } catch (error) {
    console.log(error)
       return NextResponse.json({
      status : "ERROR",
      message : error.toString()
      })
   }
}