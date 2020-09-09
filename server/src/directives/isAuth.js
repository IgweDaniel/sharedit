import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver } from "graphql";

export class IsAuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const [, , { user }] = args;

      if (user) {
        const result = await resolve.apply(this, args);
        return result;
      } else {
        throw new Error(
          "You must be the authenticated user to get    this information"
        );
      }
    };
  }
}
