/**
 *  AgentError is
 */
export interface AgentError {
  type: "Login";
  message: string | (() => string);
}
