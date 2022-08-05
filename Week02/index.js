// Start your es6 scripts here
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import resolvers from './resolvers'
import schema from './schema'

const app = express()
//route
app.get('/', (req,res)=>{
    res.send('running')
})

const root = resolvers;
//middleware
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(8000, ()=>console.log("running at 8000"))


