import { Context } from "@apollo/client"

export const resolvers = {
  Query: {
    books: async (parent: any, args: any, context: Context) => {
      return await context.prisma.book.findMany()
    },
    book: async (parent: any, args: any, context: Context) => {
      return await context.prisma.book.findUnique({
        where: {
          id: args.id,
        },
      })
    },
  },
  Mutation: {
    createBook: async (parent: any, args: any, context: Context) => {
      return await context.prisma.book.create({
        data: {
          title: args.title,
          image: args.image,
        },
      })
    },
    updateBook: async (parent: any, args: any, context: Context) => {
      return await context.prisma.book.update({
        where: {
          id: args.id,
        },
        data: {
          title: args.title,
          image: args.image,
        },
      })
    },
    addAuthor: async (parent: any, args: any, context: Context) => {
      return await context.prisma.author.create({
        data: {
          name: args.name,
          bookId: args.bookId,
        },
      })
    },
    deleteAuthor: async (parent: any, args: any, context: Context) => {
      return await context.prisma.author.delete({
        where: {
          id: args.id,
        },
      })
    },
  },
  Book: {
    authors: async (parent: any, args: any, context: Context) => {
      return await context.prisma.author.findMany({
        where: {
          bookId: parent.id,
        },
      })
    },
  },
}
