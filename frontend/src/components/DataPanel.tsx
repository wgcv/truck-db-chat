import { useState } from 'react'
import { useDataFetch } from '../hooks/useDataFetch'
import type {
  MaintenanceComment,
  MaintenanceRequest,
  RoadSupportService,
} from '../types'
import { DataTable } from './DataTable'

type Tab = 'requests' | 'comments' | 'road' | 'ai-diagram' | 'architecture'

const TABS: { id: Tab; label: string }[] = [
  { id: 'requests', label: 'Maintenance Requests' },
  { id: 'comments', label: 'Maintenance Comments' },
  { id: 'road', label: 'Road Support' },
  { id: 'ai-diagram', label: 'AI Diagram' },
  { id: 'architecture', label: 'Architecture' },


]

function MaintenanceRequestsTab() {
  const { data, status, error, refetch } =
    useDataFetch<MaintenanceRequest>('/maintenance-request')
  return (
    <DataTable
      data={data as unknown as Record<string, unknown>[]}
      status={status}
      error={error}
      onRefetch={refetch}
    />
  )
}

function MaintenanceCommentsTab() {
  const { data, status, error, refetch } =
    useDataFetch<MaintenanceComment>('/maintenance-comment')
  return (
    <DataTable
      data={data as unknown as Record<string, unknown>[]}
      status={status}
      error={error}
      onRefetch={refetch}
    />
  )
}

function RoadSupportTab() {
  const { data, status, error, refetch } =
    useDataFetch<RoadSupportService>('/road-support-service')
  return (
    <DataTable
      data={data as unknown as Record<string, unknown>[]}
      status={status}
      error={error}
      onRefetch={refetch}
    />
  )
}

function AiDiagramTab() {
  return (
    <div>
      <img src="/img/maintenance_agent.png" alt="Maintenance Agent" width={500} height={500} />
    </div>
  )
}

function ArchitectureTab() {
  return (
    <div>
      <img src="/img/architecture.png" alt="Infrastructure" width={1000} height={1000} />
    </div>
  )
}

export function DataPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('requests')

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-4 pt-4 pb-0 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-700 mb-3">Fleet Data</h2>
        <div className="flex gap-1 overflow-x-auto flex-nowrap -mx-4 px-4 scroll-smooth">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-3 py-2 text-xs font-medium rounded-t-md transition-colors border-b-2 ${activeTab === tab.id
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'requests' && <MaintenanceRequestsTab />}
        {activeTab === 'comments' && <MaintenanceCommentsTab />}
        {activeTab === 'road' && <RoadSupportTab />}
        {activeTab === 'ai-diagram' && <AiDiagramTab />}
        {activeTab === 'architecture' && <ArchitectureTab />}
      </div>
    </div>
  )
}
