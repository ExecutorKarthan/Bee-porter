import { Link } from 'react-router-dom';
import  Auth  from '../utils/auth';
import { QUERY_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';

const Profile = () => {
    if (!Auth.loggedIn()) {
        window.location.assign('/');
      }

    const { loading, data } = useQuery(QUERY_USER);
    
    if (loading) {
        return <div>Loading...</div>;
      }

    if (!data?.me) {
        return (
        <h4>
            You need to be logged in to see this. Use the navigation links above to
            sign up or log in!
        </h4>
        );
    }

    return (
        <>
        <Link to="/">Back to home</Link>   
        <h2>
        {data.me.firstName} {data.me.lastName}'s Profile
        </h2>
        <h3>Your email: {data.me.email}</h3>
        <h3>Your home zipcode: {data.me.zipcode}</h3>
        </>
    )
}

export default Profile;