from langgraph.prebuilt import ToolNode
from agents.maintenance.state import MessagesState
from langchain.messages import SystemMessage

# Step 1: Define model
from langchain_openrouter import ChatOpenRouter

from agents.maintenance.tools import add_maintenance_comment, call_road_support_service, save_maintenance_request

model = ChatOpenRouter(
    model="stepfun/step-3.5-flash:fast",
    temperature=0,
)


model_for_tools = ChatOpenRouter(
    model="stepfun/step-3.5-flash:fast",
    temperature=0,
)





# Step 2: Define model nodes
tools = [save_maintenance_request, add_maintenance_comment, call_road_support_service]
model_with_tools = model_for_tools.bind_tools(tools)
tool_node = ToolNode(tools)


def check_is_english(state: MessagesState):
    """If the last message is not in English, translate it before passing to the LLM."""
    language = state.get("language", "en")
    print("check_is_english | language: ", language)
    if language == "en":
        return {}

    last_message = state["messages"][-1]
    translated = model.invoke([
        SystemMessage(content="Translate the following message to English. Return only the translated text, nothing else."),
        last_message,
    ])
    translated.id = last_message.id
    return {"messages": [translated]}

def check_need_to_translate(state: MessagesState):
    """Translate the last message to the user's language if it's not English."""
    language = state.get("language", "en")
    print("check_need_to_translate | language: ", language)

    if language == "en":
        return {}

    last_message = state["messages"][-1]
    translated = model.invoke([
        SystemMessage(content=f"Translate the following message to {language}. Return only the translated text, nothing else."),
        last_message,
    ])
    translated.id = last_message.id
    return {"messages": [translated]}


def llm_call(state: MessagesState):
    """LLM decides whether to call a tool or not"""
    print("llm_call")
    return {
        "messages": [
            model_with_tools.invoke(
                [
                    SystemMessage(
                        content="You are maintenance specialist for a road maintenance, sometimes the drivers only want to add a comment of what they fix in the road, other they need to create a maintenance request."
                    )
                ]
                + state["messages"]
            )
        ],
        "llm_calls": state.get('llm_calls', 0) + 1
    }
