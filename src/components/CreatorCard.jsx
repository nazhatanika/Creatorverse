import { Link } from 'react-router-dom'
import '../App.css'

export default function CreatorCard({ creator }) {
  const { id, name, url, description, imageURL } = creator
  return (
    <article className="creator-card">
      {imageURL && <img src={imageURL} alt={name} />}
      <h3><Link to={`/creators/${id}`}>{name}</Link></h3>
      <p>{description}</p>
      <a href={url} target="_blank" rel="noreferrer">Visit Channel</a>
      <div>
        <Link to={`/creators/${id}/edit`}>Edit</Link>
      </div>
    </article>
  )
}