

from langgraph.graph.message import Annotated, AnyMessage, TypedDict, add_messages


class MessagesState(TypedDict):
    messages: Annotated[list[AnyMessage], add_messages]
    llm_calls: int
    language: str
    vehicle_id: str