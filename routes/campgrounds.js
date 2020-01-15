var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");



router.get("/",function(req,res){
  Campground.find({},function(err,allCampgrounds){
    if(err) console.log(err);
    else{
      res.render("campgrounds/index",{campgrounds:allCampgrounds});
    }
  })
});


router.post("/",function(req, res){

  // get data from from and add it to database
  // redirect to campgrounds page
  var name = req.body.name;
  var image =req.body.image;
  var description = req.body.description;
  var newCampground = {name:name, image:image, description:description };
  Campground.create(newCampground, function(err,newlyCreated){
    if (err) console.log(err);
    else {
      res.redirect("/");
    }
  });
});

router.get("/new", function(req,res){

   res.render("campgrounds/new");
});

router.get("/:id",function(req,res){
  //find the campground that matches the id, and show it.
  Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
    if(err) console.log(err);
    else{
      console.log(foundCampground);
      res.render("campgrounds/show",{campground:foundCampground});
    }
  });
})

function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next();
  }else{
    res.redirect("/login");
  }
}

module.exports= router;
