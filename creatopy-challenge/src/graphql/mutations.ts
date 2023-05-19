import { gql } from '@apollo/client';

export const CREATE_ITEM_MUTATION = gql`
    mutation CreateItem($title: String!, $userId: ID!) {
        createItem(title: $title, userId: $userId) {
            id
            title
            user {
                id
                name
                email
            }
        }
    }
`;
export const CREATE_USER_MUTATION = gql`
    mutation CreateUser($email: String!, $password: String!) {
        createUser(email: $email, password: $password) {
            id
            name
            email
        }
    }
`;

export const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            name
            email
        }
    }
`;

export const GET_ITEMS_QUERY = gql`
    query GetItems {
        items {
            id
            title
            user {
                id
                email
            }
        }
    }
`;
