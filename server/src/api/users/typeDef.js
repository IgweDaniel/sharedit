import { gql } from "apollo-server";

export const userDefs = gql`
  type AuthPayLoad {
    token: String
  }
  type User {
    id: String
    name: String
    email: String
  }
  type AuthUser {
    id: String
    name: String
    email: String
    docs: [Doc]
    sharedDocs: [Doc]
  }

  type Query {
    myDocs: [Doc] @isAuth
    mySharedDoc: [Doc] @isAuth
    me: AuthUser @isAuth
    loginUser(email: String!, password: String!): AuthPayLoad
  }

  type Mutation {
    createUser(name: String, email: String!, password: String!): AuthPayLoad
  }
`;
