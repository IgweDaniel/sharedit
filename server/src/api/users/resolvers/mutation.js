import { prisma } from "@/services";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtSecret } from "@/config";

const Mutation = {
  async createUser(parent, { email, password, name }) {
    try {
      const hash = bcrypt.hashSync(password, 10),
        user = await prisma.user.create({
          data: {
            name,
            email,
            password: hash,
          },
        });

      const token = await jwt.sign({ id: user.id }, jwtSecret, {
        expiresIn: 60 * 60,
      });

      return {
        token,
      };
    } catch (error) {
      if (error.code == "P2002") throw Error("Duplicate Email");
    }
  },
};

export default Mutation;
