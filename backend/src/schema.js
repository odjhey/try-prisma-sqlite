const { gql } = require("apollo-server");

const typeDefs = gql`
  type Todo {
    id: Int!
    name: String!
    description: String
    tasks: [Task!]!
  }

  type Task {
    id: Int!
    description: String
    todo: Todo
  }

  type Query {
    allTodos: [Todo!]!
  }

  type Mutation {
    createTodo(data: TodoCreateInput!): Todo
  }

  input TodoCreateInput {
    name: String!
    description: String
    tasks: [TaskCreateInput!]!
  }

  input TaskCreateInput {
    description: String!
  }
`;

const resolvers = {
  Query: {
    allTodos: (_p, _a, context) => {
      return context.prisma.todo.findMany();
    },
  },
  Todo: {
    tasks: (parent, _args, ctx) => {
      return ctx.prisma.todo.findUnique({ where: { id: parent.id } }).tasks();
    },
  },
  Task: {
    todo: (parent, _args, ctx) => {
      return ctx.prisma.task
        .findUnique({
          where: { id: parent.id },
        })
        .todo();
    },
  },
  Mutation: {
    createTodo: (_parent, args, context) => {
      const tasks = args.data.tasks
        ? args.data.tasks.map((task) => {
            return {
              description: task.description,
            };
          })
        : [];
      return context.prisma.todo.create({
        data: {
          name: args.data.name,
          description: args.data.description,
          tasks: {
            create: tasks,
          },
        },
      });
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
