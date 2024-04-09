export interface AiModelResponse {
  type: "appetizerPairing" | "entreePairing" | "error";
  name: string;
  description: string;
}
;
