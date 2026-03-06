import { useCallback, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { ChatMessage, Language, StreamPayload } from '../types'

const LLM_URL = '/stream'

export function useStream() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const sendMessage = useCallback(
    async (
      userText: string,
      language: Language,
      vehicleId: string,
      threadId: string,
    ) => {
      if (isStreaming) return

      const userMsg: ChatMessage = {
        id: uuidv4(),
        role: 'user',
        content: userText,
      }

      const assistantMsgId = uuidv4()
      const assistantMsg: ChatMessage = {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        streaming: true,
      }

      setMessages((prev) => [...prev, userMsg, assistantMsg])
      setIsStreaming(true)

      const controller = new AbortController()
      abortRef.current = controller

      const payload: StreamPayload = {
        message: userText,
        language,
        vehicle_id: vehicleId,
        thread_id: threadId,
      }

      try {
        const response = await fetch(LLM_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`)
        }

        const reader = response.body?.getReader()
        if (!reader) throw new Error('No response body')

        const decoder = new TextDecoder()

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })

          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId
                ? { ...m, content: m.content + chunk }
                : m,
            ),
          )
        }
      } catch (err) {
        if ((err as Error).name === 'AbortError') return

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  content: m.content || 'Error: could not reach the assistant.',
                  streaming: false,
                }
              : m,
          ),
        )
      } finally {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId ? { ...m, streaming: false } : m,
          ),
        )
        setIsStreaming(false)
        abortRef.current = null
      }
    },
    [isStreaming],
  )

  const stop = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return { messages, isStreaming, sendMessage, stop, clearMessages }
}
