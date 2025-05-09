import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Post from './components/Post.jsx'
import Home from './components/Home.jsx'
import Bookmark from './components/Bookmark.jsx'
import Notifications from './components/Notifications.jsx'

import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {fetchPosts} from './slices/postSlice.js'

function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchPosts())
  }, [])

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/item/:id" element={ <Post /> } />        
        <Route path="/bookmarks" element={ <Bookmark /> } />
        <Route path="/Notifications" element={ <Notifications /> } />
      </Routes>
      
    </div>
  )
}

export default App
