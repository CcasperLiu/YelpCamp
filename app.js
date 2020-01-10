var express = require("express"),
    app= express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
  name:String,
  image:String,
  description:String,
});

var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create(
//   {
//     name:"Granite Hills",
//     image:"https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/25201637/day_2_dec_14_085.jpg",
//     description: "This is a huge granite hill, no bathroom, no water!"
//   }, function(err, campground){
//      if (err) console.log(err);
//      else {
//       console.log("newly created campground");
//       console.log(campground);
//      }
//   });

var campgrounds = [{name:"num1", image:"https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/25201637/day_2_dec_14_085.jpg"}
      ,{name:"num2", image:"https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/25201637/day _2_dec_14_085.jpg"}
];

app.get("/", function(req,res){
	 res.render("landing");
});


app.get("/campgrounds",function(req,res){
  Campground.find({},function(err,allCampgrounds){
    if(err) console.log(err);
    else{
      res.render("index",{campgrounds:allCampgrounds});
    }
  })
});


app.post("/campgrounds",function(req, res){
  // get data from from and add it to database
  // redirect to campgrounds page
  var name = req.body.name;
  var image =req.body.image;
  var description = req.body.description;
  var newCampground = {name:name, image:image, description:description };
  Campground.create(newCampground, function(err,newlyCreated){
    if (err) console.log(err);
    else {
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function(req,res){

   res.render("new.ejs");
});

app.get("/campgrounds/:id",function(req,res){
  //find the campground that matches the id, and show it.
  Campground.findById(req.params.id, function(err,foundCampground){
    if(err) console.log(err);
    else{
      res.render("show",{campground:foundCampground});
    }
  });
})

app.listen(3000, function(){
	console.log("yelpCamp server has started!");
});

