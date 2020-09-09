import Mutation from "./mutation";
import Query from "./query";
import { prisma } from "@/services";

export const userResolver = {
  Query,
  Mutation,
  AuthUser: {
    async docs(parent, _, { user }) {
      const docs = await prisma.doc.findMany({
        where: {
          owner: user,
        },
      });

      return docs;
    },
    async sharedDocs(parent, _, { user }) {
      const sharedDocs = await prisma.doc.findMany({
        where: {
          collabers: {
            some: {
              id: user.id,
            },
          },
        },
        include: {
          owner: true,
        },
      });

      return sharedDocs;
    },
  },
};
