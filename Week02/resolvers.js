import { v4 as uuidv4 } from "uuid"
const fs = require("fs")

class Author{
    constructor(id, { author_name, author_phone, author_email}){
        this.id = id;
        this.author_email=author_email;
        this.author_name=author_name;
        this.author_phone=author_phone;
    }
}

let filename = "authors.json"
let authors_file_obj = fs.readFileSync(filename, "utf-8")
let author_holder = JSON.parse(authors_file_obj)

const resolvers = {
    getAuthor: ({id}) => {
        return new Author(id, author_holder[id])
    },
    createAuthor: ({input}) => { 
        let id = uuidv4()
        author_holder[id] = input
        console.log(input)
        console.log(author_holder)
        return new Author(id, author_holder[id])
    },

    getAuthors: () => {
        let authors = []
        Object.keys(author_holder).forEach(idx => {
            authors.push(new Author(idx, author_holder[idx]))
        })

        return authors
    },

    updateAuthor: ({ id, input }) => {  
        author_holder[id] = input
        fs.writeFile(filename, JSON.stringify(author_holder), e => console.log(e?e:"updated"))
        return new Author(id, input)
    },

    deleteAuthor: ({ id }) => {
        let current_authors = {}
        let deleted
        Object.keys(author_holder).forEach(idx => {
            if(idx != id) 
                current_authors[idx] = author_holder[idx]
            else
                deleted = author_holder[id]
        })
        author_holder = current_authors
        fs.writeFile(filename, JSON.stringify(author_holder), e => console.log(e?e:"deleted"))
        return new Author(id, deleted)
    }
}

export default resolvers;

//TODO:save data in json
