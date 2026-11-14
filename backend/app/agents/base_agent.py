"""
Base Agent Architecture for SkillPath AI 2.0
Provides unified agent lifecycle, execution timing, input/output tracking,
and transparent fallbacks between LLM and Rule-Based expert systems.
"""

import time
import datetime
from typing import Dict, Any, Optional
from app.config import settings

class BaseAgent:
    def __init__(self, agent_id: str, name: str, role: str, description: str, icon: str):
        self.agent_id = agent_id
        self.name = name
        self.role = role
        self.description = description
        self.icon = icon
        self.status = "IDLE"  # IDLE, RUNNING, SUCCESS, ERROR
        self.last_run_timestamp: Optional[str] = None
        self.execution_time_ms: int = 0
        self.input_payload: Optional[Dict[str, Any]] = None
        self.output_payload: Optional[Dict[str, Any]] = None
        self.source_type = "rule-based"

    def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Executes the agent lifecycle with instrumentation and error handling."""
        start_time = time.time()
        self.status = "RUNNING"
        self.input_payload = input_data
        self.last_run_timestamp = datetime.datetime.now().isoformat()
        
        try:
            # Check if LLM API is available and agent supports LLM execution
            if settings.has_llm_credentials:
                try:
                    result = self.execute_llm(input_data)
                    self.source_type = "llm"
                except Exception as llm_err:
                    # Graceful fallback to rule-based logic if LLM fails
                    result = self.execute_rule_based(input_data)
                    self.source_type = "rule-based"
                    result["_fallback_notice"] = f"LLM error: {str(llm_err)}. Fallen back to rule-based engine."
            else:
                result = self.execute_rule_based(input_data)
                self.source_type = "rule-based"

            elapsed_ms = int((time.time() - start_time) * 1000)
            self.execution_time_ms = elapsed_ms
            self.status = "SUCCESS"
            
            # Inject agent metadata into output
            result["_agent"] = {
                "id": self.agent_id,
                "name": self.name,
                "role": self.role,
                "source_type": self.source_type,
                "execution_time_ms": elapsed_ms,
                "timestamp": self.last_run_timestamp
            }
            self.output_payload = result
            return result
        except Exception as e:
            self.status = "ERROR"
            elapsed_ms = int((time.time() - start_time) * 1000)
            self.execution_time_ms = elapsed_ms
            error_output = {
                "error": str(e),
                "_agent": {
                    "id": self.agent_id,
                    "name": self.name,
                    "status": "ERROR",
                    "execution_time_ms": elapsed_ms
                }
            }
            self.output_payload = error_output
            raise e

    def execute_rule_based(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Deterministic rule-based expert logic. Must be implemented by subclasses."""
        raise NotImplementedError

    def execute_llm(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Optional LLM-enhanced generation. Defaults to calling rule-based if not overridden."""
        return self.execute_rule_based(input_data)

    def get_metadata(self) -> Dict[str, Any]:
        """Returns the public status and execution snapshot of the agent."""
        return {
            "id": self.agent_id,
            "name": self.name,
            "role": self.role,
            "description": self.description,
            "icon": self.icon,
            "status": self.status,
            "source_type": self.source_type,
            "last_run_timestamp": self.last_run_timestamp,
            "execution_time_ms": self.execution_time_ms,
            "input_payload": self.input_payload,
            "output_payload": self.output_payload
        }
