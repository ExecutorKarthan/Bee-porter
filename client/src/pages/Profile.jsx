import { Link } from 'react-router-dom';
import { QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import  Auth  from '../utils/auth';

const Profile = () => {
    const token = Auth.getToken();
    const userData = Auth.getUser(token)
    console.log(userData)
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