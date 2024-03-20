import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';


function Signup(props) {
  // State to manage form inputs
  const [formState, setFormState] = useState({ email: '', password: '', firstName: '', lastName: '', zipcode: '' });
  // Mutation hook for adding user
  const [addUser, { error }] = useMutation(ADD_USER);

  // Function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Execute addUser mutation with form data
      console.log(formState);
      const {data} = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
          zipcode: parseInt(formState.zipcode)
        },
      });
      // Login user after successful signup
      Auth.login(data.addUser.token);
    } catch (e) {
      console.log(e);
    }
  };

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Update form state with new input value
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1 d-flex justify-content-center align-items-center">
      <div>
        {/* Link to login page */}
        <Link to="/login" className="link">← Go to Login</Link>
        <h2 className="heading">Signup</h2>
        {/* Signup form */}
        <form onSubmit={handleFormSubmit}>
          {/* First name input */}
          <div className="form-group">
            <label htmlFor="firstName">First Name: </label>
            <input
              placeholder="First"
              name="firstName"
              type="text"
              id="firstName"
              className="input"
              onChange={handleChange}
            />
          </div>
          {/* Last name input */}
          <div className="form-group">
            <label htmlFor="lastName">Last Name: </label>
            <input
              placeholder="Last"
              name="lastName"
              type="text"
              id="lastName"
              className="input"
              onChange={handleChange}
            />
          </div>
          {/* Email input */}
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              className="input"
              onChange={handleChange}
            />
          </div>
          {/* Password input */}
          <div className="form-group">
            <label htmlFor="pwd">Password: </label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              className="input"
              onChange={handleChange}
            />
          </div>
          {/* Zipcode input */}
          <div className="form-group">
            <label htmlFor="zipcode">Zipcode: </label>
            <input
              placeholder="123456"
              name="zipcode"
              type="text"
              id="zip"
              className="input"
              onChange={handleChange}
            />
          </div>
          {/* Error message for signup failure */}
          {error ? (
            <div>
              <p className="error-text">The provided credentials are incorrect</p>
            </div>
          ) : null}
          {/* Submit button */}
          <div className="container">
		        <div className="text-center">
              <button type="submit" className="button">Submit</button>
		        </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;