from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain.messages import HumanMessage

load_dotenv()

from agents.maintenance.agent import agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http(s)?://(127\.0\.0\.1|localhost)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
async def read_root():
    return "Hello regulis"

async def token_stream(message: str, language: str, vehicle_id: str, thread_id: str):
    result = await agent.ainvoke(
        {"messages": [HumanMessage(content=message)], "language": language, "vehicle_id": vehicle_id},
        config = {"configurable": {"thread_id": thread_id}}
    )
    yield result["messages"][-1].content


class StreamRequest(BaseModel):
    message: str
    language: str
    vehicle_id: str
    thread_id: str


@app.post("/stream")
async def stream_root(request: StreamRequest):
    return StreamingResponse(token_stream(request.message, request.language, request.vehicle_id, request.thread_id), media_type="text/plain")


