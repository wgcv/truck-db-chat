import type { FetchStatus } from '../hooks/useDataFetch'

interface DataTableProps<T extends Record<string, unknown>> {
  data: T[]
  status: FetchStatus
  error: string | null
  onRefetch: () => void
}

function formatHeader(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase())
    .trim()
}

function formatCell(value: unknown): string {
  if (value === null || value === undefined) return '—'
  return String(value)
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  status,
  error,
  onRefetch,
}: DataTableProps<T>) {
  const columns = data.length > 0 ? (Object.keys(data[0]) as (keyof T)[]) : []

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end mb-2">
        <button
          onClick={onRefetch}
          disabled={status === 'loading'}
          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-3.5 w-3.5 ${status === 'loading' ? 'animate-spin' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>

      {status === 'loading' && (
        <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
          Loading…
        </div>
      )}

      {status === 'error' && (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <p className="text-red-500 text-sm">Failed to load: {error}</p>
          <button
            onClick={onRefetch}
            className="text-xs px-3 py-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {(status === 'success' || (status === 'idle' && data.length > 0)) && (
        <>
          {data.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
              No records found.
            </div>
          ) : (
            <div className="overflow-auto rounded-lg border border-slate-200">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    {columns.map((col) => (
                      <th
                        key={String(col)}
                        className="px-4 py-2.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap border-b border-slate-200"
                      >
                        {formatHeader(String(col))}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {data.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      {columns.map((col) => (
                        <td
                          key={String(col)}
                          className="px-4 py-2.5 text-slate-700 whitespace-nowrap"
                        >
                          {formatCell(row[col])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}
