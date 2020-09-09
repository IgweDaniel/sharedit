import { prisma } from "@/services";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtSecret } from "@/config";

const Query = {
  async me(parent, args, { user }) {
    const me = await prisma.user.findOne({
      where: {
        id: user.id,
      },
    });
    return me;
  },
  async loginUser(parent, { email, password }) {
    const user = await prisma.user.findOne({
      where: {
        email,
      },
    });
    if (!user) throw Error("Unauthorized");
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw Error("Unauthorized");
    const token = await jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: 60 * 60,
    });

    return {
      token,
    };
  },
};

export default Query;
