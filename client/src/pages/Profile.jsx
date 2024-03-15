import { Link } from 'react-router-dom';
import { QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import  Auth  from '../utils/auth';

const Profile = () => {
    const token = Auth.getToken();
    console.log(token)
    const userData = Auth.getUser(token)
    console.log(userData.data._id)
    const { data } = useQuery(QUERY_USER, {
        variables: {
            id: userData.data._id,
        }
    }
    );
    let user;
   
    if(data) {
        user = userData;
    }
    console.log(user)
    return (
        <>
        <Link to="/">Back to home</Link>
        {user} ? (
            
            <h2>
                {user.firstName}'s Profile
            </h2>
        )
        </>
    )
}

export default Profile;