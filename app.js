var express = require("express"),
    app= express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB= require("./seeds");



seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v3",{useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//SCHEMA SETUP


app.get("/", function(req,res){
	 res.render("landing");
});


app.get("/campgrounds",function(req,res){
  Campground.find({},function(err,allCampgrounds){
    if(err) console.log(err);
    else{
      res.render("campgrounds/index",{campgrounds:allCampgrounds});
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

   res.render("campground/new");
});

app.get("/campgrounds/:id",function(req,res){
  //find the campground that matches the id, and show it.
  Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
    if(err) console.log(err);
    else{
      console.log(foundCampground);
      res.render("campgrounds/show",{campground:foundCampground});
    }
  });
})


// ----------Comment Routes
app.get("/campgrounds/:id/comments/new", function(req,res){
  //find campground by id
  Campground.findById(req.params.id,function(err,campground){
    if(err) console.log(err);
    else {
      res.render("comments/new", {campground:campground});
    }
  })
});

app.post("/campgrounds/:id/comments", function(req,res){
  Campground.findById(req.params.id,function(err,campground){
    if(err) {
      console.log(err);
      redirect("/campgrounds");
    }
    else{

      Comment.create(req.body.comment, function(err, comment){
        if (err) console.log(err);
        else{
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/"+campground._id);
        }
      })

    }
  })
})

app.listen(8080, function(){
	console.log("yelpCamp server has started!");
});

