export const typeDefs = `#graphql
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

type Mutation  {
  createBook(title: String, image: String): Book
  updateBook(id: ID!, title: String, image: String): Book
  addAuthor(name: String, bookId: ID!): Author
  deleteAuthor(id: ID!): Author
}
`
