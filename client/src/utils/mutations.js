import { gql } from '@apollo/client';
// GraphQL mutation for user login
export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            email
            firstName
            lastName
        }
    }
}`
// GraphQL mutation for adding a new user
export const ADD_USER = gql`
mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $zipcode: Int!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, zipcode: $zipcode) {
        token
        user {
            _id
            email
            firstName
            lastName
            zipcode
        }
    }
}`
// GraphQL mutation for adding a new swarm
export const ADD_SWARM = gql`
mutation addSwarm($latitude: Float!, $longitude: Float!, $description: String!, $contactInfo: String!) {
    addSwarm(latitude: $latitude, longitude: $longitude, description: $description, contactInfo: $contactInfo) {
        latitude
        longitude
        description
        contactInfo
    }
}`
// GraphQL mutation for removing a swarm
export const REMOVE_SWARM = gql`
mutation removeSwarm($latitude: Float!, $longitude: Float!) {
    removeSwarm(latitude: $latitude, longitude: $longitude) {
        _id
        description
        contactInfo
    }
}`

export const UPDATE_EMAIL = gql`
mutation updateEmail($email: String!) {
    updateEmail(email: $email) {
        email
    }
}`