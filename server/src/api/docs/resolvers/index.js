import Mutation from "./mutation";
import Query from "./query";
import { prisma } from "@/services";

export const docResolver = {
  Query,
  Mutation,
  Doc: {
    async collaborators({ id }) {
      const { collabers } = await prisma.doc.findOne({
        where: {
          id,
        },
        include: {
          collabers: true,
        },
      });

      return collabers;
    },
    async owner({ id }) {
      const { owner } = await prisma.doc.findOne({
        where: {
          id,
        },
        include: {
          owner: true,
        },
      });
      return owner;
    },
  },
};
