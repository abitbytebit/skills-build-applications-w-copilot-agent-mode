const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api'

export async function fetchCollection(endpoint) {
  const response = await fetch(endpoint)
  if (!response.ok) {
    throw new Error(`Unable to load data (${response.status})`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.results)) return payload.results
  return []
}