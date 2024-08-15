import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { PrismaClient } from "@prisma/client/extension"
import prisma from "@/prisma/db"

export type Context = {
  prisma: PrismaClient
}

const typeDefs = `#graphql
  type Book {
    id: ID!,
    title: String,
    image: String,
    createdAt: String,
    updatedAt: String,
    authors: [Author]
  }

  type Author {
    id: ID!,
    name: String,
    bookId: String,
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }
`

const resolvers = {
  Query: {
    books: async (parent: any, args: any, context: Context) => {
      return await prisma.book.findMany()
    },
    book: async (parent: any, args: any, context: Context) => {
      return await prisma.book.findUnique({
        where: {
          id: args.id,
        },
      })
    },
  },
  Book: {
    authors: async (parent: any, args: any, context: Context) => {
      return await prisma.author.findMany({
        where: {
          bookId: parent.id,
        },
      })
    },
  },
}

const apolloServer = new ApolloServer<Context>({
  resolvers,
  typeDefs,
})

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, prisma }),
})
