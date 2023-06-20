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


const locations= [

    {
        "_id": "640eeee8ff94dd2f5d4ec1ab",
        "name": "Thane, Mumbai",
        "city_id": "5",
        "location_id": "5",
        "country_name": "India",
        "  state_id": "2"
      },
      {
        "_id": "640eeee8ff94dd2f5d4ec1a6",
        "name": "MSP, Delhi",
        "city_id": "1",
        "location_id": "3",
        "country_name": "India",
        "  state_id ": "1"
      },
      {
        "_id": "640eeee8ff94dd2f5d4ec1a7",
        "name": "MSP, Pune",
        "city_id": "2",
        "location_id": "4",
        "country_name": "India",
        "state_id": "2"
      },
      {
        "_id": "640eeee8ff94dd2f5d4ec1aa",
        "name": "Anna Nagar, Chennai",
        "city_id": "4",
        "location_id": "5",
        "country_name": "India",
        "state_id": "5"
      },
      {
        "_id": "640eeee8ff94dd2f5d4ec1a4",
        "name": "ShalimarBhagh, Delhi",
        "city_id": "1",
        "location_id": "1",
        "country_name": "India",
        "state_id": "1"
      },
      {
        "_id": "640eeee8ff94dd2f5d4ec1a9",
        "name": "Mahadevapura, Bangalore",
        "city_id": "3",
        "location_id": "5",
        "country_name": "India",
        "  state_id ": "3"
      },
      {
        "_id": "640eeee8ff94dd2f5d4ec1a5",
        "name": "Janpat, Delhi",
        "city_id": "1",
        "location_id": "2",
        "country_name": "India",
        "state_id": "1"
      },
      {
        "_id": "640eeee8ff94dd2f5d4ec1a8",
        "name": "Anand Vihar, Delhi",
        "city_id": "1",
        "location_id": "5",
        "country_name": "India",
        "state_id": "1"
      },
      {
        "_id": "640eeeebff94dd2f5d4ec1b0",
        "name": "Anand Vihar, Delhi",
        "city_id": "1",
        "location_id": "5",
        "country_name": "India",
        "state_id": "1"
      },
      {
        "_id": "640eeeebff94dd2f5d4ec1ac",
        "name": "ShalimarBhagh, Delhi",
        "city_id": "1",
        "location_id": "1",
        "country_name": "India",
        "state_id": "1"
      },
      {
        "_id": "640eeeebff94dd2f5d4ec1b1",
        "name": "Mahadevapura, Bangalore",
        "city_id": "3",
        "location_id": "5",
        "country_name": "India",
        "state_id": "3"
      },
      {
        "_id": "640eeeebff94dd2f5d4ec1ad",
        "name": "Janpat, Delhi",
        "city_id": "1",
        "location_id": "2",
        "country_name": "India",
        "state_id": "1"
      },
      {
        "_id": "640eeeebff94dd2f5d4ec1b2",
        "name": "Anna Nagar, Chennai",
        "city_id": "4",
        "location_id": "5",
        "country_name": "India",
        "state_id": "5"
      },
      {
        "_id": "640eeeebff94dd2f5d4ec1ae",
        "name": "MSP, Delhi",
        "city_id": "1",
        "location_id": "3",
        "country_name": "India",
        "state_id": "1"
      },
      {
        "_id": "640eeeebff94dd2f5d4ec1af",
        "name": "MSP, Pune",
        "city_id": "2",
        "location_id": "4",
        "country_name": "India",
        "state_id": "2"
      },
      {
        "_id": "640eeeebff94dd2f5d4ec1b3",
        "name": "Thane, Mumbai",
        "city_id": "5",
        "location_id": "5",
        "country_name": "India",
        "state_id": "2"
      }
];
const mealtype=
[
    {
    "_id": "640f772cff94dd2f5d4ec1c9",
    "mealtype_id": 1,
    "mealtype": "Breakfast",
    "content": "Start your day with exclusive breakfast options",
    "meal_image": "https://i.ibb.co/FVhSTWK/breakfast.jpg"
    },
    {
    "_id": "640f772cff94dd2f5d4ec1ca",
    "mealtype_id": 2,
    "mealtype": "Lunch",
    "content": "Start your day with exclusive breakfast options",
    "meal_image": "https://i.ibb.co/8rPxkWP/lunch.jpg"
    },
    {
    "_id": "640f772cff94dd2f5d4ec1cb",
    "mealtype_id": 3,
    "mealtype": "Dinner",
    "content": "Start your day with exclusive breakfast options",
    "meal_image": "https://i.ibb.co/XjzPqYv/dinner.jpg"
    },
    {
    "_id": "640f772cff94dd2f5d4ec1cc",
    "mealtype_id": 4,
    "mealtype": "Snacks",
    "content": "Start your day with exclusive breakfast options",
    "meal_image": "https://i.ibb.co/wchCHfb/snacks.jpg"
    },
    {
    "_id": "640f772cff94dd2f5d4ec1cd",
    "mealtype_id": 5,
    "mealtype": "Drinks",
    "content": "Start your day with exclusive breakfast options",
    "meal_image": "https://i.ibb.co/YR0S6fV/drinks.jpg"
    },
    {
    "_id": "640f772cff94dd2f5d4ec1ce",
    "mealtype_id": 6,
    "mealtype": "NightLife",
    "content": "Start your day with exclusive breakfast options",
    "meal_image": "https://i.ibb.co/q1fC2jW/nightlife.jpg"
    }
    ]
//connecteing to mongodb server
MongoClient.connect(MONGO_URL,(err,client)=>
{
    console.log("Mongo is connected");
    if(err)
    {
        console.log("Error while connecting");
    }
        db =client.db("Restaurant-app");
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

