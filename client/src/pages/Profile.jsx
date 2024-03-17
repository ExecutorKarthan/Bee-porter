import { Link } from 'react-router-dom';
import  Auth  from '../utils/auth';

const Profile = () => {
    // try{
    const token = Auth.getToken();
    if(!token){
        window.location.assign("/login")
    }
    else{
        console.log(token)
        const userData = Auth.getUser(token)
        console.log(userData)
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