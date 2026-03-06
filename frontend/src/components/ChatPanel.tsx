import {
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { useMemo, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useStream } from '../hooks/useStream'
import type { Language } from '../types'

const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
  { value: 'en', label: 'English (en)' },
  { value: 'es', label: 'Español (es)' },
  { value: 'fr', label: 'Français (fr)' },
  { value: 'br', label: 'Português BR (br)' },
]

const DEFAULT_VEHICLE_ID = '123-o1'

export function ChatPanel() {
  const [language, setLanguage] = useState<Language>('en')
  const [vehicleId, setVehicleId] = useState(DEFAULT_VEHICLE_ID)
  const threadId = useRef(uuidv4())

  const { messages, isStreaming, sendMessage, stop, clearMessages } = useStream()

  const handleSend = (text: string) => {
    const clean = text.replace(/<[^>]*>/g, '').trim()
    if (!clean) return
    sendMessage(clean, language, vehicleId, threadId.current)
  }

  const chatMessages = useMemo(
    () =>
      messages.map((m) => ({
        message: m.content || (m.streaming ? '…' : ''),
        sentTime: 'now',
        sender: m.role === 'user' ? 'You' : 'Assistant',
        direction: m.role === 'user' ? ('outgoing' as const) : ('incoming' as const),
        position: 'single' as const,
      })),
    [messages],
  )

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header controls */}
      <div className="px-4 py-3 border-b border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-700">Fleet Assistant</h2>
          <button
            onClick={clearMessages}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            Clear chat
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Language */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-full text-sm border border-slate-300 rounded-md px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle ID */}
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Vehicle ID
            </label>
            <input
              type="text"
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              placeholder="e.g. 123-o1"
              className="w-full text-sm border border-slate-300 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Thread ID badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Session ID:</span>
          <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded truncate max-w-xs">
            {threadId.current}
          </span>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 min-h-0">
        <MainContainer style={{ border: 'none', height: '100%' }}>
          <ChatContainer>
            <MessageList
              typingIndicator={
                isStreaming ? (
                  <TypingIndicator content="Assistant is thinking…" />
                ) : null
              }
            >
              {chatMessages.length === 0 && (
                <MessageList.Content
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    color: '#94a3b8',
                    fontSize: '0.875rem',
                    gap: '0.5rem',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-slate-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <span>Send a message to get started</span>
                </MessageList.Content>
              )}
              {chatMessages.map((msg, idx) => (
                <Message key={idx} model={msg} />
              ))}
            </MessageList>

            <MessageInput
              placeholder="Type your message…"
              onSend={handleSend}
              disabled={isStreaming}
              attachButton={false}
            />
          </ChatContainer>
        </MainContainer>
      </div>

      {/* Stop streaming button */}
      {isStreaming && (
        <div className="px-4 py-2 border-t border-slate-100 flex justify-center">
          <button
            onClick={stop}
            className="text-xs px-4 py-1.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors border border-red-200"
          >
            Stop generating
          </button>
        </div>
      )}
    </div>
  )
}
