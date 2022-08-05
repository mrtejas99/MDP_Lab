const { MongoClient } = require('mongodb');

async function main() {

    const uri = "mongodb+srv://tejas:tejas1234@cluster0.n08nm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {useUnifiedTopology: true});

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        let result;

        //insert one document
        let student = {name:'bob', age:16, class:10 } 
        result = await client.db("school").collection("student").insertOne(student);
        console.log(`New listing created with the following id: ${result.insertedId}`);

        //insert multiple documents
        let students = [ {name:'tom', age:15, class:10 },  {name:'alice', age:10, class:5 },  {name:'jerry', age:12, class:7 } ]
        result = await client.db("school").collection("student").insertMany(students);
        console.log(` ${result.insertedCount} New listings created with the following ids: ${result.insertedIds}`);

        //read one document
        result = await client.db("school").collection("student").findOne({ name: 'bob' });
        if (result) 
            console.table(result);
        else 
            console.log('No student found with the name ');
        
        //read multiple documents
        const cursor = client.db("school").collection("student").find({age: { $gt: 14 }}).sort({class:-1}).limit(10);
        const results = await cursor.toArray();
        if (results.length) 
            console.table(results);
        else 
            console.log('No students found ');

        //update one document
        result = await client.db("school").collection("student").updateOne({ name: 'bob' }, { $set: {age:17, class:11} });
        console.log(`${result.matchedCount} document(s) matched the query criteria.`);

        //update multiple documents
        result = await client.db("school").collection("student").updateMany({ class:10 }, { $set:  {age: 16 }} );
        console.log(`${result.matchedCount} document(s) matched the query criteria.`);
        console.log(`${result.modifiedCount} document(s) was/were updated.`);   
        
        //delete one document
        result = await client.db("school").collection("student").deleteOne({ name: 'alice' });
        console.log(`${result.deletedCount} document(s) was/were deleted.`);

        //delete multiple documents
        result = await client.db("school").collection("student").deleteMany({ age: { $lt: 18 } });
        console.log(`${result.deletedCount} document(s) was/were deleted.`);

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

