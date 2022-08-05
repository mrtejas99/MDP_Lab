import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Book{
        id:ID
        book_name: String
        book_author: Author
        pages: Int
        chapters: [String]
    }

    type Author{
        id: ID
        author_name: String
        author_phone: String
        author_email: String
    }

    input AuthorInput{
        id: ID
        author_name: String!
        author_phone: String!
        author_email: String!
    }

    input AuthorUpdateInput {
        author_name: String
        author_phone: String
        author_email: String
    }

    type Query{
        getAuthor(id: ID): Author
        getAuthors: [Author]
    }

    type Mutation{
        createAuthor(input: AuthorInput): Author
        updateAuthor(id: ID, input: AuthorUpdateInput): Author
        deleteAuthor(id: ID): Author
    } 
`)
//keep Query as Query, Mutation as Mutation(something like POST)
//! implies required

export default schema;