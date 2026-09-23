import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { ErrorMessage, Empty, Loading, Page } from './Activities.jsx'

function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <Page title="Teams" eyebrow="YOUR CREW" description="Small groups make consistency easier.">
    {state.loading ? <Loading /> : state.error ? <ErrorMessage message={state.error} /> : <div className="card-grid">{teams.map((team) => <article className="info-card" key={team._id}><div className="card-mark">{team.name.slice(0, 2).toUpperCase()}</div><h2>{team.name}</h2><p>{team.description || 'No description yet.'}</p><footer>{team.members?.length || 0} members</footer></article>)}{!teams.length && <Empty />}</div>}
  </Page>
}
export default Teams