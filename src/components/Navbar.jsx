import {NavLink} from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PersonIcon from '@mui/icons-material/Person';

export default function Navbar(){

    return(
        <nav>
            <h3>TravelMedia.in</h3>
            <div className="menu">
                <NavLink to="/"> <HomeIcon sx={{ color:" #f05a22" }}/> </NavLink>
                <NavLink to="/notifications"> <NotificationsIcon sx={{ color:" #f05a22" }} /> </NavLink>
                <NavLink to="/bookmarks"> <BookmarkIcon sx={{ color:" #f05a22" }} /> </NavLink>
                <NavLink to="/profile"> <PersonIcon sx={{ color:" #f05a22" }} /> </NavLink>
            </div>
        </nav>
    )
}