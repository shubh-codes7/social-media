// import {useParams} from 'react-router-dom'
// import {useSelector} from 'react-redux'
// import CircularProgress from '@mui/material/CircularProgress';
// import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
// import ShareIcon from '@mui/icons-material/Share';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import {Link} from 'react-router-dom'
// import {useState} from 'react'
// import Card from './Card.jsx'
// import {addBookmark, removeBookmark} from '../slices/bookmarkSlice.js'
// import { useDispatch } from 'react-redux'


import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { addBookmark, removeBookmark } from '../slices/bookmarkSlice'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import CircularProgress from '@mui/material/CircularProgress'
import Card from './Card.jsx'

export default function Post() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const postId = Number(id)
    const posts = useSelector(state => state.post.data)
    const bookmarks = useSelector(state => state.bookmark)

    const post = posts.find(p => p.id === postId)
    const filteredPosts = posts.filter(p => p.id !== postId)

    const [selectedBtn, setSelectedBtn] = useState(1)
    const [like, setLike] = useState(false)

    // Sync like state with Redux bookmark list
    useEffect(() => {
        const isBookmarked = bookmarks.some(b => b.id === postId)
        setLike(isBookmarked)
    }, [postId, bookmarks]) // re-check when postId or bookmarks change

    if (!post) return <CircularProgress id="loader" />

    function handleLikeToggle() {
        if (like) {
            dispatch(removeBookmark(post.id))
        } else {
            dispatch(addBookmark(post))
        }
        setLike(!like)
    }

    return (
        <div id="post">
            <div className="flex">
                <Link to={`/`}> <ArrowCircleLeftIcon /> </Link>
                <h2>Post Number {id}</h2>
            </div>

            <div className="singlePost">
                <div id="postImg">
                    <img src={`https://picsum.photos/200?random=${id}`} />
                    <div className="postIcons">
                        <h5>{post.title.slice(0, 20)}</h5>
                        <div className="flex">
                            <ShareIcon />
                            {like 
                                ? <FavoriteIcon style={{ color: "red" }} onClick={handleLikeToggle} /> 
                                : <FavoriteBorderIcon onClick={handleLikeToggle} />
                            }
                        </div>
                    </div>
                </div>

                <div className="postBody">
                    <div className="buttons">
                        <button className={selectedBtn === 1 ? "selected" : ''} onClick={() => setSelectedBtn(1)}>Details</button>
                        <button className={selectedBtn === 2 ? "selected" : ''} onClick={() => setSelectedBtn(2)}>User Info</button>
                    </div>
                    <p>
                        {selectedBtn === 1
                            ? post.body
                            : `Post was posted by user ID: ${id}`
                        }
                    </p>
                </div>
            </div>

            <h2>More Posts</h2>
            <div className="cards">
                {filteredPosts.map(post => <Card key={post.id} post={post} />)}
            </div>
        </div>
    )
}
