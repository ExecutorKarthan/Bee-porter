import { gql } from '@apollo/client';

// export const QUERY_USER = gql`
// query me ($_id: ID!) {
//     me(userId: $_id){
//         _id
//         email
//         firstName
//         lastName
//     }
// }`

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

export const QUERY_SWARM = gql`
query swarm {
    swarm {
        _id
        location
        description
        contactInfo
    }
}`