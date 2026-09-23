import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { ErrorMessage, Empty, Loading, Page } from './Activities.jsx'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <Page title="Leaderboard" eyebrow="THE FIELD" description="See who is building the strongest week.">
    {state.loading ? <Loading /> : state.error ? <ErrorMessage message={state.error} /> : <div className="leaderboard-list">{entries.map((entry) => <article className="leader-row" key={entry._id}><span className="rank">{String(entry.rank).padStart(2, '0')}</span><div className="avatar">{(entry.userId?.profile?.displayName || entry.userId?.username || '?')[0]}</div><div className="leader-name"><strong>{entry.userId?.profile?.displayName || entry.userId?.username || 'Unknown athlete'}</strong><span>{entry.activities} activities</span></div><strong className="points">{entry.points}<small> pts</small></strong></article>)}{!entries.length && <Empty />}</div>}
  </Page>
}
export default Leaderboard