import { gql } from '@apollo/client';
// GraphQL query for fetching user data
export const QUERY_USER = gql`
query Me {
    me {
      _id
      email
      firstName
      lastName
      zipcode
    }
}
`
// GraphQL query for fetching swarm data
export const QUERY_SWARM = gql`
query swarm {
    swarm {
        _id
        location
        description
        contactInfo
    }
}`