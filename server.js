const express = require("express");
const server = express();
const mongo = require ("mongodb");
const dotenv = require("dotenv").config();
const cors = require("cors");//Cross-origin resource share
const bodyParser = require("body-parser");
server.use(cors());
server.use(bodyParser.json());
let db ;
const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb+srv://test:test@cluster0.mxlm7ff.mongodb.net/Restaurant-app"
const PORT =process.env.PORT;




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


//location end point
server.get("/location",(req,res)=>
{

    db.collection("location").find().toArray((err,result)=>
    {

        if(err) throw err;
        res.send(result);
    })

    // console.log(location);
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
let state_id = Number(req.query.state_id);
let mealId  = Number(req.query.mealId);


 if(stateId)
{
    query = { state_id : state_id};
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
server.get("/RestaurantonStateId",(req,res)=>
{

  let query = {};
  let stateId = Number(req.query.stateId);

  if(stateId)
  {
    query = {state_id : stateId}
  }
  db.collection("RestaurantData").find(query).toArray((err,result)=>
  {

    if(err) throw err;
    res.send(result);
  })
})


