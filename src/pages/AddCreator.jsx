import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'

export default function AddCreator() {
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '' })
  const navigate = useNavigate()

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('creators').insert([form])
    if (error) return alert(error.message)
    navigate('/')
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Add Creator</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
      <input name="url" placeholder="URL" value={form.url} onChange={onChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={onChange} required />
      <input name="imageURL" placeholder="Image URL (optional)" value={form.imageURL} onChange={onChange} />
      <button type="submit">Add</button>
    </form>
  )
}