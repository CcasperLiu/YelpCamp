 var express = require("express");
var app= express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.get("/", function(req,res){
	 res.render("landing");
});

var campgrounds = [{name:"num1", image:"https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/25201637/day_2_dec_14_085.jpg"}
      ,{name:"num2", image:"https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/25201637/day _2_dec_14_085.jpg"}
  ];

app.get("/campgrounds",function(req,res){
	res.render("campgrounds", {campgrounds:campgrounds});
});


app.post("/campgrounds",function(req, res){
  // get data from from and add it to database
  // redirect to campgrounds page
  var name = req.body.name;
  var image =req.body.image;
  var newCampground = {name:name, image:image };
  campgrounds.push(newCampground);
  res.redirect('/campgrounds');
});

app.get("/campgrounds/new", function(req,res){

   res.render("new.ejs");
});

app.listen(8080, function(){
	console.log("yelpCamp server has started!");
});

