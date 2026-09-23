import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : '/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection(activitiesEndpoint).then(setActivities).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false })))
  }, [])

  return <Page title="Activity log" eyebrow="MOMENTUM" description="Every session, captured in one place.">
    {state.loading ? <Loading /> : state.error ? <ErrorMessage message={state.error} /> : <div className="table-wrap"><table><thead><tr><th>Workout</th><th>Athlete</th><th>Duration</th><th>Points</th><th>Notes</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td><span className="activity-dot" />{activity.type}</td><td>{activity.userId?.profile?.displayName || activity.userId?.username || 'Unknown athlete'}</td><td>{activity.durationMinutes} min</td><td className="number">{activity.points}</td><td>{activity.notes || 'No notes'}</td></tr>)}</tbody></table>{!activities.length && <Empty />}</div>}
  </Page>
}

function Page({ title, eyebrow, description, children }) { return <><div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div></div>{children}</> }
function Loading() { return <p className="status">Loading your data...</p> }
function ErrorMessage({ message }) { return <p className="status error">{message}</p> }
function Empty() { return <p className="status">No records yet.</p> }

export { Activities, ErrorMessage, Empty, Loading, Page }
export default Activities