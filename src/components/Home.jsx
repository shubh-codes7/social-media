import { useSelector } from 'react-redux'
import { useState } from 'react'
import Card from './Card.jsx'
import CircularProgress from '@mui/material/CircularProgress'

export default function Home() {
  const { data: posts = [], isLoading } = useSelector(state => state.post)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) return <CircularProgress id="loader" />

  return (
    <div className="home">
      <h2>Social Media For Travellers</h2>
      
      <input
        type="text"
        placeholder="🔍 Search here..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      
      <div className="cards">
        {filteredPosts?.map(post => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
