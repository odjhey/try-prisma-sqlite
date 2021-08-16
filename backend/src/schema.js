const { gql } = require("apollo-server");

const typeDefs = gql`
  type Todo {
    id: Int!
    name: String!
    description: String
  }

  type Query {
    allTodos: [Todo!]!
  }
`;

const resolvers = {
  Query: {
    allTodos: (_p, _a, context) => {
      return context.prisma.todo.findMany();
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
