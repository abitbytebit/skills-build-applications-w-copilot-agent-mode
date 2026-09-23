import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { ErrorMessage, Empty, Loading, Page } from './Activities.jsx'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : '/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchCollection(workoutsEndpoint).then(setWorkouts).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <Page title="Workout library" eyebrow="YOUR NEXT MOVE" description="A focused session is always within reach.">
    {state.loading ? <Loading /> : state.error ? <ErrorMessage message={state.error} /> : <div className="card-grid workouts">{workouts.map((workout) => <article className="info-card" key={workout._id}><div className="workout-meta"><span className="level">{workout.fitnessLevel}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><footer>Start session <span aria-hidden="true">↗</span></footer></article>)}{!workouts.length && <Empty />}</div>}
  </Page>
}
export default Workouts