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
              //////////////////// Creating a Collection named [destinations] in Divine-Travels Database ////////////////// 
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
                
            //////////////////////////////////////////////////////////////////////////////////////////////
            /////     Get 3 Different Data From the same collection [destinations]
            ///////////////////////////////////////////////////////////////////////////////////////////////  
                app.get('/popular-destinations',async(req,res)=>{   /////// When hitting the url /popular-destinations in browser , you can get the following Data of (popularDestinations) variable
                    const query = {} ;  ////// Here, we can get All the Data From the MongoDB Collection 
                    const cursor = destinationCollection.find(query); //// Here I mentioned from which Database collection I would get all the Data
                    const destinations = await cursor.toArray();     /////// All Data has been wrapped inside an Array and assigned into destinations variable
                    const popularDestinations = destinations.slice(2,5);   ////// Among all Data in the destinations variable , only 3 specific data taken by using slice 
                    res.send(popularDestinations);
                });

             ///////////////////////////////////////////////////////////////////////////////////////////
             //////      Post Operation to insert a New Data in the MongoDB [destinations] collection 
             //////////////////////////////////////////////////////////////////////////////////////////
                 app.post('/destinations', async (req,res)=>{
                     const destination = req.body;  //// Retrieving Data from the Client Side (AddDestination Component)
                     const result = await destinationCollection.insertOne(destination); //// The Data in destination variable will be inserted into MongoDB (destination) collection
                     res.send(result);
                 });   

            ////////////////////////////////////////////////////////////////////////////////////////////
            /////////   Creating [reviews], a New Collection of [Divine-Travels] Database in MongoDB 
            ////////////////////////////////////////////////////////////////////////////////////////////
                  const reviewsCollection = client.db('Divine-Travels').collection('reviews');  

              ///////////////////////////////////////////////////////////////////////////////////////////
             //////      Post Operation to insert a New Data in the MongoDB [reviews] collection 
             //////////////////////////////////////////////////////////////////////////////////////////
             app.post('/reviews', async (req,res)=>{
                const userReview = req.body;  //// Retrieving Data from the Client Side (AddDestination Component)
                const result = await reviewsCollection.insertOne(userReview); //// The Data in destination variable will be inserted into MongoDB (destination) collection
                res.send(result);
            });   
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////
           ///        Get All Data From MongoDB [destinations] Collection
           //////////////////////////////////////////////////////////////////////////////////////////////////////////// 
           app.get('/reviews',async(req,res)=>{
            const query = { } ;  ////// Here, we can get All the Data From the MongoDB Collection 
            const cursor = reviewsCollection.find(query); //// Here I mentioned from which Database collection I would get all the Data
             const userReviews = await cursor.toArray();
            res.send(userReviews);
        });
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