from langchain_core.runnables.graph_mermaid import draw_mermaid_png
import re



def save_graph(agent, tools):
    mermaid = agent.get_graph().draw_mermaid()
    tool_names = [t.name for t in tools]
    tool_nodes = "\n\t\t".join([f'{name}(["{name}"])' for name in tool_names])
    subgraph = f'subgraph tool_node["tool_node"]\n\t\t{tool_nodes}\n\tend'
    mermaid = re.sub(r'\btool_node\(tool_node\)', subgraph, mermaid)

    with open(f"graphs/{agent.name}.png", "wb") as f:
        f.write(draw_mermaid_png(mermaid))
        
    