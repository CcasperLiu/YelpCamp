var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    seedDB        = require("./seeds"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    User          = require("./models/user")


//requiring routes
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index")



seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v3",{useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.use(require("express-session")({
  secret:"blahblahblah no one loves anyone, propably except for parents",
  resave:false,
  saveUnintialized:false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//adding a midware to every route
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
})

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds",campgroundRoutes);

// ----------Comment Routes


app.listen(8080, function(){
	console.log("yelpCamp server has started!");
});

