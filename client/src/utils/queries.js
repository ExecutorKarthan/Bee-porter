import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($id: ID) {
    user(id: $id) {
        _id
        email
        firstName
        lastName
    }
}`

export const QUERY_SWARM = gql`
query swarm {
    swarm {
        _id
        location
        description
        contactInfo
    }
}`