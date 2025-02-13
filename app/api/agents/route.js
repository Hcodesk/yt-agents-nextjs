import {Agent , Task , Team } from "kaibanjs"
import {NextResponse} from "next/server"
import { useVideoStore } from "@/store/videoStore"
import {Tool, ToolParams} from "@langchain/core/tools"
import {z} from "zod"

//définition Agent 1 : Get video info & audioUrl
const {videoUrl} =  useVideoStore.getState()

const infoAgent = new Agent ({
    name : "videoFetcher",
    role : "Get youtube video info based on the video url & audio url",
    goal : "Get video info & audio url",
    background : "Experimented in youtube api data extraction",

    }
)

//custom tool to get video info
export class VideoInfoTool extends Tool {

    constructor(fields: { name: string; description: string }) {
        super();
        this.name = fields.name;
        this.description = fields.description;
        this.schema = z.object({ videoUrl: z.string() });
      }
    

    name : string ;
    description : string ;
    async _call(input : string) {

    }
 
}


