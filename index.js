const express = require('express');
require('dotenv').config()
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('Hello');
});


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vaoc00y.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const collection = client.db("hardware-collection").collection("hardware");

        // TODO: post
        app.post('/item',async(req,res)=>{
            const item = req.body;
            const result = await collection.insertOne(item);
            res.send(result)
        });

        // TODO: get
        app.get('/items',async(req,res)=>{
            const query = {};
            const cursor = collection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        });

        // TODO: get singleData
        app.get('/item/:id',async(req,res)=>{
            const id = req.params.id;
            const options = {}
            const query = {_id: ObjectId(id)};
            const result = await collection.findOne(query,options);
            res.send(result);
        });

        //TODO: put
        app.put('/update/:id',async(req,res)=>{
            const id = req.params.id;
            const addQuantities = req.body;
            const filter = {_id: ObjectId(id)};
            const options  = {upsert:true};
            const updateDoc = {
                $set: {
                    quantity : addQuantities.quantity
                },
              };
            const result = await collection.updateOne(filter,updateDoc,options);
            res.send(result);
        });

        //TODO: put
        app.put('/update/:id',async(req,res)=>{
            const id = req.params.id;
            const addQuantities = req.body;
            const filter = {_id: ObjectId(id)};
            const options  = {upsert:true};
            const updateDoc = {
                $set: {
                    quantity : addQuantities.quantity
                },
              };
            const result = await collection.updateOne(filter,updateDoc,options);
            res.send(result);
        });

        //TODO: delete
        app.delete('/delete/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await collection.deleteOne(query);
            res.send(result);
        });

    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);



app.listen(port,()=>{
    console.log('Listening to port:',port);
});