import { gql } from "apollo-server";

export const docDefs = gql`
  type Doc {
    id: Int!
    owner: User
    name: String
    content: String
    collaborators: [User]
  }

  extend type Query {
    getDoc(id: Int!): Doc @isAuth
  }
  extend type Mutation {
    saveDoc(id: Int!, content: String!): Doc! @isAuth
    createDoc(name: String!, password: String!): Doc! @isAuth
    updateDoc(id: Int!, name: String, password: String): Doc! @isAuth
    collaborate(id: Int!, password: String!): Doc! @isAuth
    blackListUser(docId: Int!, userId: Int!): Doc @isAuth
  }
`;
