import { useSelector } from 'react-redux'
import Card from './Card.jsx'

export default function Bookmark(){

    const bookmarks = useSelector(state => state.bookmark)
    console.log(bookmarks)

    return(
        <div className="cards">
            {
                bookmarks.map(post => <Card key={post.id} post={post} />)
            }
        </div>
    )
}