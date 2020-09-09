// import { SchemaDirectiveVisitor } from "apollo-server-express";
// import { defaultFieldResolver } from "graphql";

// export class IsOwnerDirective extends SchemaDirectiveVisitor {
//   visitFieldDefinition(field) {
//     const { resolve = defaultFieldResolver } = field;
//     field.resolve = async function (...args) {
//       const [, , { user }] = args;

//       const result = await resolve.apply(this, args);
//       //   return result;

//       console.log(result);
//     };
//   }
// }
