import { useSelector } from 'react-redux'
import Card from './Card.jsx'

export default function Bookmark(){

    const bookmarks = useSelector(state => state.bookmark)

    return(
        <div id="bookmarks" >
        <h2>Bookmarks</h2>
        {
            bookmarks.length === 0 && <p className="noData">No Bookmarks</p>
        }
        <div className="cards">
            {
                bookmarks.map(post => <Card key={post.id} post={post} /> )
            }
        </div>
        </div>
    )
}