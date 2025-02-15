import {tool} from "@langchain/core/tools"
import {z} from "zod"
import { ChatGoogleGenerativeAI} from "@langchain/google-genai"
import { ChatPromptTemplate} from "@langchain/core/prompts"
import {createToolCallinAgent} from "langchain/agents"
import dotenv from "dotenv"


//initialize dotenv to load environment variables
dotenv.config()


export async function GET(req) {
   try {
    //building langchain agent
       const search = new TavilySearchResult({
           maxResults : 2
       })

       const tools = [search]

       const llm = new ChatGoogleGenerativeAI({
            model : "gemini-pro",
            maxOutputTokens : 2000,
            apiKey : process.env.GOOGLE_API_KEY
       })

       const prompt  = ChatPromptTemplate.fromMessages([
          [
              "system",
              "You are a helpfull assistant that answer the following questions as best you can. You have access to the following tools"
          ],
          ["placeholder", "{chat_history"],
          ["human", {input}],
          ["placeholder", "{agent_scratchpad}"]
       ])

       const agent = createToolCallinAgent({ llm, tools , prompt})

       const agentExecutor = new AgentExecutor({
            agent,
            tools,
       })

       const result = await agentExecutor.invoke({
            imput : "what is the weathre in cairo"
       })

       return NextResponse.json(result)


    
   } catch (error) {
     console.log (error)

return NextResponse.json(error.message) }
}