import { prisma } from "@/services";

const Query = {
  async getDoc(parent, { id }) {
    const doc = await prisma.doc.findOne({
      where: {
        id,
      },
    });

    return doc;
  },
};

export default Query;
