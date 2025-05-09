import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Link} from 'react-router-dom'

export default function Card({post}){
    const {id, title, body} = post
    
    return(
        <div id="card">
            <img src={`https://picsum.photos/200?random=${id}`}/>
            <div className="content">
            <div className="body">
                <h5>{title}</h5>
                <p>{body.slice(0, 85) + ","} <Link to={`/item/${id}`}> Read more...</Link></p>
            </div>
            <Link to={`/item/${id}`}> <ChevronRightIcon /> </Link>
            </div>
        </div>
    )
}