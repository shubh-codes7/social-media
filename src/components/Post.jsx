import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { addBookmark, removeBookmark } from '../slices/bookmarkSlice'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShareIcon from '@mui/icons-material/Share'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import CircularProgress from '@mui/material/CircularProgress'
import { addNotification } from '../slices/notificationSlice'
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

    // Sync like state with Redux
    useEffect(() => {
        const isBookmarked = bookmarks.some(b => b.id === postId)
        setLike(isBookmarked)
    }, [postId, bookmarks])

    if (!post) return <CircularProgress id="loader" />

    function handleLikeToggle() {
        if (like) {
            dispatch(removeBookmark(post.id))
            dispatch(addNotification({id: post.id, action: "removed", time: new Date().toLocaleString()}))
        }
        else {
            dispatch(addBookmark(post))
            dispatch(addNotification({id: post.id, action: "added", time: new Date().toLocaleString()}))
        }

        setLike(!like)
    }

    function handleShare() {
        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: "Check out this post!",
                url: window.location.href,
            })
            .then(() => console.log("Shared successfully"))
            .catch(err => console.log("Error sharing", err))
        } else {
            alert("Sharing not supported in this browser.")
        }
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
                            <ShareIcon onClick={handleShare} style={{ cursor: "pointer" }} />
                            {like 
                                ? <FavoriteIcon style={{ color: "red", cursor: "pointer" }} onClick={handleLikeToggle}/> 
                                : <FavoriteBorderIcon style={{ cursor: "pointer" }} onClick={handleLikeToggle} />
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
