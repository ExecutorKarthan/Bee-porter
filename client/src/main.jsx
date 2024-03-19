import React from 'react' // Import React library
import ReactDOM from 'react-dom/client' // Import ReactDOM for rendering
import App from './App.jsx' // Import the main App component
import Home from './pages/Home'; // Import Home component
import Login from './pages/Login'; // Import Login component
import Signup from './pages/Signup'; // Import Signup component

import Profile from './pages/Profile.jsx'; // Import Profile component

import Success from './pages/Success'; // Import Success component

import './App.css' // Import CSS file for styling

import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Import routing utilities
// Define routes for the application using createBrowserRouter
const router = createBrowserRouter([
  {
      path: "/",
      element: <App />,
      error: <Error />,
      children: [
          {
              index: true,
              element: <Home />
          },
          {
              path: "/login",
              element: <Login />
          },
          {
              path: "/signup",
              element: <Signup />
          },
          {
            path: "/profile",
            element: <Profile />
          },
          {
            path: '/success',
            element: <Success />
          },
      ]
  }
]);
// Render the application using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} /> // Provide the router to the application using RouterProvider
)
