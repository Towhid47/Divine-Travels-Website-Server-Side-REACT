const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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