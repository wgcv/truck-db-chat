import os

import httpx
from langchain.tools import tool
from langgraph.prebuilt import InjectedState
from typing import Annotated

from agents.maintenance.state import MessagesState

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:3000")
_TIMEOUT = httpx.Timeout(10.0, connect=5.0)


# Define tools
@tool
def save_maintenance_request(json_payload: dict, state: Annotated[MessagesState, InjectedState]) -> dict:
    """Request truck repair or maintenance. This will create a maintenance request in the system. 
    This is not for road maintenance or assistance, if you need to call the road support service, use the call_road_support_service tool.
    for example: "I need to change oil soon", "I need to make a tire rotation" or "The aire system is not working well should be fixed soon".
    Args:
        json_payload: {
            "reason": "I need to change oil soon",
        }
    """
    json_payload["vehicleId"] = state.get("vehicle_id", "")
    json_payload["status"] = "pending"

    try:
        response = httpx.post(
            f"{BACKEND_URL}/maintenance-request",
            json=json_payload,
            timeout=_TIMEOUT,
        )
        response.raise_for_status()
        return {"status": str(response.status_code), "response": response.json()}
    except httpx.HTTPStatusError as e:
        return {"status": str(e.response.status_code), "error": e.response.text}
    except httpx.RequestError as e:
        return {"status": "error", "error": str(e)}

@tool
def add_maintenance_comment(json_payload: dict, state: Annotated[MessagesState, InjectedState]) -> dict:
    """Add a comment issue in the road, this not create maintenance request is only a comment for future reference.
    For example: "I changed fuse of the gas pump" or "The truck is leaking oil but is not major issue".

    Args:
        json_payload: {
            "comment": "I changed fuse of the gas pump",
        }
    """
    json_payload["vehicleId"] = state.get("vehicle_id", "")
    try:
        response = httpx.post(
            f"{BACKEND_URL}/maintenance-comment",
            json=json_payload,
            timeout=_TIMEOUT,
        )
        response.raise_for_status()
        return {"status": str(response.status_code), "response": response.json()}
    except httpx.HTTPStatusError as e:
        return {"status": str(e.response.status_code), "error": e.response.text}
    except httpx.RequestError as e:
        return {"status": "error", "error": str(e)}

@tool
def call_road_support_service(json_payload: dict, state: Annotated[MessagesState, InjectedState]) -> dict:
    """Call the road support service to fix the road maintenance request. This is road maintenance only, if you need to create a maintenance request, use the save_maintenance_request tool.
    for example: "I need to change a tire", "I need to tow the truck to the repair shop" or "I need battery jump start".

    Args:
        json_payload: {
            "reason": "The truck is not starting",
            "location": "123 Main St, Anytown, SF",
        }
    """
    print("call_road_support_service | json_payload: ", json_payload)
    # Make a fake api call
    json_payload["vehicleId"] = state.get("vehicle_id", "")
    try:
        response = httpx.post(
            f"{BACKEND_URL}/road-support-service",
            json=json_payload,
            timeout=_TIMEOUT,
        )
        response.raise_for_status()
        return {"status": str(response.status_code), "response": response.json()}
    except httpx.HTTPStatusError as e:
        return {"status": str(e.response.status_code), "error": e.response.text}
    except httpx.RequestError as e:
        return {"status": "error", "error": str(e)}

