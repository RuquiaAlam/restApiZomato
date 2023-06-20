const express = require("express");
const server = express();
const mongo = require ("mongodb");
const dotenv = require("dotenv").config();
const cors = require("cors");//Cross-origin resource share
const bodyParser = require("body-parser");

let db ;
const MongoClient = mongo.MongoClient;
server.use(cors());
const MONGO_URL = process.env.MONGO_URL;
const PORT =process.env.PORT;
server.use(bodyParser.json());



//connecting to mongodb server
MongoClient.connect(MONGO_URL,(err,client)=>
{
    console.log("Mongo is connected");
    if(err)
    {
        console.log("Error while connecting");
    }
        db = client.db("Restaurant-app");
        server.listen(PORT,()=>
        {
            console.log(`Server is connected to  ${PORT}`)
        }); 
});
server.get("/",(req,res)=>
{
    res.send("Hi there!!! 😊😂❤️")
})


//location end
server.get("/location",(req,res)=>
{

    db.collection("location").find().toArray((err,result)=>
    {

        if(err) throw err;
        res.send(result);
    })

    console.log(location);
    // res.send(location)
})


//quicksearch endpoint
server.get("/quicksearch",(req,res)=>
{

    db.collection("MealType").find().toArray((err,result)=>
    {
if(err) throw err;
res.send(result);


    })

// res.send(mealtype);

});
//get restaurant data endpoint 
server.get("/restaurants",function(req,res)
{
let query = {};
let stateId = Number(req.query.stateId);
let mealId  = Number(req.query.mealId);


 if(stateId)
{
    query = { state_id : stateId};
}
else if(mealId)
{

    query = {"mealTypes.mealtype_id":mealId };
}


    db.collection("RestaurantData").find().toArray((err,result)=>
    {
if(err) throw err;
        res.send(result);
    })
});
server.get("/Restaurantdata",function(req,res)
{
  db.collection("RestaurantData").find().toArray((err,result)=>
  {
if(err) throw err;
      res.send(result);
  });

});

