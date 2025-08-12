import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

export default function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '' })

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('creators').select('*').eq('id', id).single()
      if (data) setForm(data)
    }
    load()
  }, [id])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSave = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('creators').update(form).eq('id', id)
    if (error) return alert(error.message)
    navigate(`/creators/${id}`)
  }

  const onDelete = async () => {
    if (!confirm('Delete this creator?')) return
    const { error } = await supabase.from('creators').delete().eq('id', id)
    if (error) return alert(error.message)
    navigate('/')
  }

  return (
    <form onSubmit={onSave}>
      <h2>Edit Creator</h2>
      <input name="name" value={form.name} onChange={onChange} required />
      <input name="url" value={form.url} onChange={onChange} required />
      <textarea name="description" value={form.description} onChange={onChange} required />
      <input name="imageURL" value={form.imageURL} onChange={onChange} />
      <button type="submit">Save</button>
      <button type="button" onClick={onDelete}>Delete</button>
    </form>
  )
}