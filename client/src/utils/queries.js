import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user {
    user {
        _id
        email
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