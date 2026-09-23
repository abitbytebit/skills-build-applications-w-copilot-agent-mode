import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { ErrorMessage, Empty, Loading, Page } from './Activities.jsx'

function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { fetchCollection('users').then(setUsers).catch((error) => setState({ loading: false, error: error.message })).finally(() => setState((current) => ({ ...current, loading: false }))) }, [])
  return <Page title="Athletes" eyebrow="THE COMMUNITY" description="Meet the people putting in the work.">
    {state.loading ? <Loading /> : state.error ? <ErrorMessage message={state.error} /> : <div className="card-grid">{users.map((user) => <article className="info-card user-card" key={user._id}><div className="avatar large">{(user.profile?.displayName || user.username)[0]}</div><div><h2>{user.profile?.displayName || user.username}</h2><p>@{user.username}</p></div><span className="level">{user.profile?.fitnessLevel || 'beginner'}</span></article>)}{!users.length && <Empty />}</div>}
  </Page>
}
export default Users