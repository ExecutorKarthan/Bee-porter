import { Link } from 'react-router-dom';
import  Auth  from '../utils/auth';
import { QUERY_USER } from '../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_EMAIL } from '../utils/mutations';
import { useState } from 'react';


const Profile = () => {
    // Check if user is logged in
    if (!Auth.loggedIn()) {
        // Redirect to home if not logged in
        window.location.assign('/');
    }

    // State and mutation hooks
    const [updateEmail] = useMutation(UPDATE_EMAIL);
    const [email, setEmail] = useState({email: ''});
    // Query to get user data
    const { loading, data } = useQuery(QUERY_USER);
    
    // Function to handle text input change
    const handleTextChange = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);
        console.log(currentEmail);
    };

    // Function to save updated email
    const saveEmail = async () => {
        try {
            const {data} = await updateEmail({
                variables: {email: email}});
                window.location.assign('/profile');
        }
        catch(err) {
            console.error(err);
        }
    }
    // Loading indicator
    if (loading) {
        return <div>Loading...</div>;
    }

    // If user data is not available, prompt user to login/signup
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
        <input type='text' onChange={handleTextChange} placeholder='Update your email'></input>
        <button type='submit' onClick={saveEmail}>Submit</button>
        <h3>Your home zipcode: {data.me.zipcode}</h3>
        </>
    )
}

export default Profile;