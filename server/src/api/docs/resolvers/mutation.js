import { prisma } from "@/services";

const Mutation = {
  async createDoc(parent, { name, password }, { user }) {
    const doc = await prisma.doc.create({
      data: {
        name,
        password,
        owner: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return doc;
  },

  async saveDoc(parent, { id, content }, { user }) {
    let doc = await prisma.doc.findOne({
        where: {
          id,
        },
        include: {
          collabers: true,
        },
      }),
      candEdit = false;
    if (user.id == doc.ownerId) {
      candEdit = true;
    } else {
      doc.collabers.forEach((collaber) => {
        if (collaber.id == user.id) candEdit = true;
      });
    }
    if (!candEdit) throw Error("Doc access denied");
    doc = await prisma.doc.update({
      where: { id },
      data: {
        content,
      },
    });

    return doc;
  },

  async collaborate(parent, { id, password }, { user }) {
    let doc = await prisma.doc.findOne({
      where: {
        id,
      },
      include: { owner: true },
    });

    if (user.id == doc.owner.id) throw Error("You own this document");
    else if (password != doc.password) throw Error("Cannot be a collaborator");

    doc = await prisma.doc.update({
      where: { id },
      data: {
        collabers: {
          connect: { id: user.id },
        },
      },
    });

    return doc;
  },
  async updateDoc(parent, { id, name, password }, { user }) {
    let doc = await prisma.doc.findOne({
      where: {
        id,
      },
    });

    if (!doc) throw Error("Non existent doc");
    if (doc.ownerId != user.id) throw Error("Edit Acess denied");

    const updates = {
      name: name ? name : doc.name,
      password: password ? password : doc.password,
    };

    try {
      doc = await prisma.doc.update({
        where: { id },
        data: {
          ...updates,
        },
      });
      return doc;
    } catch (error) {
      console.log(error);
    }
  },
  async blackListUser(parent, { docId, userId }, { user }) {
    let doc = await prisma.doc.findOne({
      where: {
        id: docId,
      },
    });

    if (!doc) throw Error("Non existent doc");
    try {
      if (doc.ownerId != user.id)
        throw Error("You can't blcaklist a user (ownership)");

      doc = await prisma.doc.update({
        where: { id: docId },
        data: {
          collabers: {
            disconnect: { id: userId },
          },
          blacklist: {
            connect: { id: userId },
          },
        },
      });
      return doc;
    } catch (error) {
      if (error.code == "P2017") throw Error("User Not FOUND");
      console.log({ error });
    }
  },
};

export default Mutation;
