import { gql } from '@apollo/client'

const GET_CLIENTS = gql`
  query get_clients {
    clients {
        id
        name
        email
        phone
    }
  }
`;

export {
    GET_CLIENTS
};