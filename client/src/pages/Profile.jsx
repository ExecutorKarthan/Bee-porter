import { Link } from 'react-router-dom';
import { QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';

const Profile = () => {
    const { data } = useQuery(QUERY_USER);
    let user;
    if(data) {
        user = data.user;
    }

    return (
        <>
        <Link to="/">Back to home</Link>
        {user} ? (
            
            <h2>
                {user.firstName} {user.lastName}'s Profile
            </h2>
        )
        </>
    )
}

export default Profile;