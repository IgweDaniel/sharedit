import { ApolloServer, gql } from "apollo-server";
import { userDefs, docDefs, userResolver, docResolver } from "./api";
import { merge } from "lodash";
import { IsAuthDirective } from "./directives";
import jwt from "jsonwebtoken";
import { jwtSecret } from "./config";
import { prisma } from "./services";

function getAuthToken(req) {
  const AuthHeader = req.headers["authorization"],
    token = AuthHeader ? AuthHeader.replace("Bearer ", "") : "";
  return token;
}

async function AuthenticateUser({ req }) {
  try {
    const { id } = await jwt.verify(getAuthToken(req), jwtSecret),
      user = await prisma.user.findOne({
        where: {
          id,
        },
      });
    return { user };
  } catch (error) {
    return {
      user: null,
    };
  }
}

const typeDefs = gql`
  directive @isAuth on FIELD_DEFINITION
  directive @isOwner on FIELD_DEFINITION
`;
const server = new ApolloServer({
  typeDefs: [typeDefs, userDefs, docDefs],
  resolvers: merge(userResolver, docResolver),
  schemaDirectives: {
    isAuth: IsAuthDirective,
    // isOwner: IsOwnerDirective,
  },
  context: AuthenticateUser,
});
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
