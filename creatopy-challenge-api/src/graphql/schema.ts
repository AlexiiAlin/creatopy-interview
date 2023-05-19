const { gql } = require('apollo-server');

export const typeDefs = gql`
    type User {
      id: String
      name: String
      email: String
      password: String
      items: [Item]
    }
  
    type Item {
        id: Int
        title: String 
        user: User
    }
  
    type Query {
      users: [User]
      items: [Item]
    }
    
    type Mutation {
        createItem(title: String!, userId: ID!): Item
        createUser(email: String!, password: String!): User
        login(email: String!, password: String!): User
    }
`;

