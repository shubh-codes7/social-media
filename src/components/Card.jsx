import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import { removeBookmark } from '../slices/bookmarkSlice'
import { addNotification } from '../slices/notificationSlice'


export default function Card({post}){
    const {id, title, body} = post
    const bookmark = useSelector(state => state.bookmark)

    const dispatch = useDispatch()


    const [like, setLike] = useState(false)

    useEffect(()=>{
        const isBookmarked = bookmark.some(post => post.id === Number(id))
        setLike(isBookmarked)
    }, [bookmark, id])
    
    return(
        <div id="card">
            <img src={`https://picsum.photos/200?random=${id}`}/>
            <div className="content">
            <div className="body">
                <h5>{title}</h5>
                <p>{body.slice(0, 85) + ","} <Link to={`/item/${id}`}> Read more...</Link></p>
            </div>
            {
                like ? <BookmarkRemoveIcon onClick={()=>{
                    dispatch(removeBookmark(id))
                    dispatch(addNotification({id: id, action: "removed", time: new Date().toLocaleString()}))}}
                    id="remove"/>
                    : <Link to={`/item/${id}`}> <ChevronRightIcon /> </Link>
            }
            </div>
        </div>
    )
}