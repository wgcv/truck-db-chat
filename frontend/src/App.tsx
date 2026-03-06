import { ChatPanel } from './components/ChatPanel'
import { DataPanel } from './components/DataPanel'

export default function App() {
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar header */}
      <header className="absolute top-0 left-0 right-0 h-12 bg-slate-800 flex items-center px-5 z-10 shadow-md">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span className="text-white font-semibold text-sm tracking-wide">
            Fleet Assistant
          </span>
        </div>
      </header>

      {/* Main content below header */}
      <div className="flex flex-col lg:flex-row w-full pt-12 gap-0 overflow-hidden">
        {/* Chat panel — 45% on lg+, full width stacked */}
        <div className="w-full lg:w-[45%] flex-1 min-h-0 border-r border-b lg:border-b-0 border-slate-200 overflow-hidden shadow-sm bg-white">
          <ChatPanel />
        </div>

        {/* Data panel — 55% on lg+, full width stacked */}
        <div className="w-full lg:w-[55%] flex-1 min-h-0 overflow-hidden bg-white">
          <DataPanel />
        </div>
      </div>
    </div>
  )
}
