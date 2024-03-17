import { Link } from 'react-router-dom';
import  Auth  from '../utils/auth';

const Profile = () => {
    let userData
    const token = Auth.getToken();
    if(!token){
        window.location.assign("/login")
    }
    else{
        userData = Auth.getUser(token)
    }
    return (
        <>
        <Link to="/">Back to home</Link>   
        <h2>
        {userData.data.firstName} {userData.data.lastName}'s Profile
        </h2>
        </>
    )
}

export default Profile;