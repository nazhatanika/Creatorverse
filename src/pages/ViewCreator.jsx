// src/pages/ViewCreator.jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../client'

export default function ViewCreator() {
  const { id } = useParams()
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()
      if (error) console.error(error)
      setCreator(data)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return <p>Loading…</p>
  if (!creator) return <p>Not found.</p>

  return (
    <div>
      {creator.imageURL && <img src={creator.imageURL} alt={creator.name} />}
      <h2>{creator.name}</h2>
      <p>{creator.description}</p>
      <a href={creator.url} target="_blank" rel="noreferrer">Visit Channel</a>
      <div>
        <Link to={`/creators/${id}/edit`}>Edit</Link>
        <Link to="/">Back</Link>
      </div>
    </div>
  )
}