export type Language = 'es' | 'en' | 'fr' | 'br'

export type MessageRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  streaming?: boolean
}

export interface StreamPayload {
  message: string
  language: Language
  vehicle_id: string
  thread_id: string
}

export interface MaintenanceRequest {
  id: number
  vehicleId: string
  status: string
  reason: string
  createdAt: string
  updatedAt: string
}

export interface MaintenanceComment {
  id: number
  vehicleId: string
  comment: string
  createdAt: string
}

export interface RoadSupportService {
  id: number
  vehicleId: string
  reason: string
  location: string
  createdAt: string
}

export interface ApiResponse<T> {
  status: string
  data: T[]
}
