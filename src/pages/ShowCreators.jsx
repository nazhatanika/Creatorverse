import { useEffect, useState } from 'react'
import { supabase } from '../client'
import CreatorCard from '../components/CreatorCard'
import { Link } from 'react-router-dom'

export default function ShowCreators() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) console.error(error)
      setCreators(data || [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p>Loading…</p>

  return (
    <section>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Top Creators</h2>
        <Link role="button" to="/new">Add Creator</Link>
      </header>

      {creators.length === 0 ? (
        <p>No creators yet. Click <Link to="/new">Add Creator</Link> to create one.</p>
      ) : (
        <div className="grid">
          {creators.map(c => (
            <CreatorCard key={c.id} creator={c} />
          ))}
        </div>
      )}
    </section>
  )
}