const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const Allprofiles = require ('./profiles-data.js');
mongoose.Promise = global.Promise;
const app = express();
var publicPath =  path.join(__dirname,'.././client/public');
app.use(express.static(publicPath));
//app.use(bodyParser.json());
var profile = mongoose.model('profile',
{
  name: {
    type: String,
    required : true
  },
  gender: {
    type: String,
    required : true
  },
  age: {
    type: Number,
    required : true
  },
  city: {
    type: String,
    required : true
  },
  image:{
    type: String
  },
  about: {
    type: String,
    required : true
  },
  job:{
    type: String,
    required : true
  },
  workplace:{
    type: String,
    required : true
  }
});
/*var patrick = new profile(
  {
    name: "Patrick",
    gender: "M",
    age: 18,
    city: 'Bikini Bottom',
    image:'',
    about: "Eating, Sleeping and Doing nothing. Spongebob is my best friend.",
    job:'Foodie',
    workplace:'Rock'
  }
);*/
/*var profileList = [];
profiles.forEach((value)=>{
  profileList.push(new profile(value));
})
app.get('/home',(req,res)=>{
  mongoose.connect('mongodb://localhost:27017/personaDB').then(()=>{
    profileList.map((value)=>{value.save({})});
  }).then((profile)=>{
    console.log(profile)
  }).catch((e)=>{
  console.log(e);
});

//res.send({profiles:"hello"});
  //profile.find().then((profiles)=>{
    //res.send('Hello');
    //res.json([{profiles:"hello"}]);
  //},(e)=>{
    //console.log(e);
//  });
});*/
app.get('/home',(req,res)=>{
  mongoose.connect('mongodb://localhost:27017/personaDB').then(()=>{
  profile.find({}).then((profiles)=>{
    //console.log(profiles);
    res.send({profiles: profiles});
  })}).catch((e)=>{
  console.log(e);
});
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
