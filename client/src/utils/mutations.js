import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            email
            username
        }
    }
}`

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!, $zipcode: Int!) {
    addUser(username: $username, email: $email, password: $password, zipcode: $zipcode) {
        token
        user {
            _id
            email
            username
        }
    }
}`

export const ADD_SWARM = gql`
mutation addSwarm($location: Float!, $description: String!, $contactInfo: String) {
    addSwarm(location: $location, description: $description, contactInfo: $contactInfo) {
        swarmId
        location
        description
        contactInfo
    }
}`

export const REMOVE_SWARM = gql`
mutation removeSwarm($swarmId: ID!) {
    removeSwarm(swarmId: $swarmId) {
        swarm {
            swarmId
            location
            description
            contactInfo
        }
    }
}`