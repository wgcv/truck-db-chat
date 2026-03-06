# Define tools and State
from agents.maintenance.nodes import check_is_english, check_need_to_translate, llm_call, tool_node, tools
from agents.maintenance.state import MessagesState


from typing import Literal
from langgraph.graph import StateGraph, START, END

# Memeory management
from langgraph.checkpoint.memory import MemorySaver 

# Generate graph for reference
from utils.save_graph import save_graph

# Step 1: Define logic to determine whether end the tool call or not

# Conditional edge function to route to the tool node or end based upon whether the LLM made a tool call
def should_continue(state: MessagesState) -> Literal["tool_node", "check_need_to_translate"]:
    """Decide if we should continue the loop or stop based upon whether the LLM made a tool call"""

    messages = state["messages"]
    last_message = messages[-1]

    # If the LLM makes a tool call, then perform an action
    if last_message.tool_calls:
        return "tool_node"

    # Otherwise, we stop (reply to the user)
    return "check_need_to_translate"

# Step 2: Build agent

# Build workflow
agent_builder = StateGraph[MessagesState, None, MessagesState, MessagesState](MessagesState)

# Add nodes
agent_builder.add_node("llm_call", llm_call)
agent_builder.add_node("check_is_english", check_is_english)
agent_builder.add_node("tool_node", tool_node)
agent_builder.add_node("check_need_to_translate", check_need_to_translate)

# Add edges to connect nodes
agent_builder.add_edge(START, "check_is_english")
agent_builder.add_edge("check_is_english", "llm_call")
agent_builder.add_edge("check_need_to_translate", END)

agent_builder.add_conditional_edges(
    "llm_call",
    should_continue,
    ["tool_node", "check_need_to_translate"]
)
agent_builder.add_edge("tool_node", "llm_call")

# Compile the agent
memory = MemorySaver() 
agent = agent_builder.compile(name="maintenance_agent", checkpointer=memory)


save_graph(agent, tools)
