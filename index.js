const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();



const app = express();
const port = process.env.PORT || 5000;

///// Middle Ware////////////
app.use(cors());
app.use(express.json());
////////////////////////////


////////The following Codes are for connect your Server to the MongoDB Database 
const uri = `mongodb+srv://${process.env.USER_DATABASE}:${process.env.PASSWORD_DATABASE}@cluster0.8ro0fiu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

        ////////// The Function Below is to perform many Operations of MongoDB 
        async function run(){
            try{
                const destinationCollection = client.db('Divine-Travels').collection('destinations');
           ////////////////////////////////////////////////////////////////////////////////////////////////////////////
           ///        Get All Data From MongoDB [destinations] Collection
           //////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                app.get('/destinations',async(req,res)=>{
                    const query = {} ;  ////// Here, we can get All the Data From the MongoDB Collection 
                    const cursor = destinationCollection.find(query); //// Here I mentioned from which Database collection I would get all the Data
                     const destinations = await cursor.toArray();
                    res.send(destinations);
                });
            ///////////////////////////////////////////////////////////////////////////////////////////////
            /////      Get Specific Single Data From MongoDB [destinations] Collection 
            //////////////////////////////////////////////////////////////////////////////////////////
                app.get('/destinations/:id', async (req,res)=>{
                    const id = req.params.id;
                    const query = {_id:ObjectId(id)};
                    const destination = await destinationCollection.findOne(query);
                    res.send(destination);
                });   

             ///////////////////////////////////////////////////////////////////////////////////////////
             //////      Post Operation to insert a New Data in the MongoDB [destinations] collection 
             //////////////////////////////////////////////////////////////////////////////////////////
                 app.post('/destinations', async (req,res)=>{
                     const destination = req.body;
                     
                     const result = await destinationCollection.insertOne(destination); //// The Data in destination variable will be inserted into MongoDB (destination) collection
                     res.send(result);
                 })   
            }
            finally{

            }
        }
        run().catch(error => error.message);

               






app.get('/',(req,res)=>{
    res.send("Divine Travels Server is Running");
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})