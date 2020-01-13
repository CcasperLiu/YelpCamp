var mongoose =  require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data =[
  {
    name:"cloud's rest",
    image:"http://www.thecampbar.com/wp-content/uploads/2017/07/bonfire-camp-campfire-1061640-3-768x1148.jpg",
    description:"blah blah blah"
  },
  {
    name:"milky way",
    image:"https://5a6a246dfe17a1aac1cd-b99970780ce78ebdd694d83e551ef810.ssl.cf1.rackcdn.com/orgheaders/3395/night%20camp%20lassen.jpg",
    description:"blah blah blah"
  },
  {
    name:"green tent",
    image:"https://maotchitim.org/wp-content/uploads/2019/07/camp-2587926_960_720.jpg",
    description:"blah blah blah"
  }
]


function seedDB(){
  //remove all campgrounds
  Campground.remove({}, function(err){
    if(err) console.log(err);
    else {
      console.log("removed campgrounds");
      Comment.remove({},function(err){
        if (err) console.log(err);
        else {
          console.log("removed comments");
          data.forEach(function(seed){
          Campground.create(seed, function(err,campground){
            if (err) console.log(err);
            else {
              console.log('added a new campground');
              Comment.create(
                             {
                              text:"what are you gonna do? are you gonna promise not hooking up anymore? how can I trust you on that ?",
                              author:"homer",
                            }, function(err,comment){
                              if (err) console.log(err);
                              else {
                                campground.comments.push(comment);
                                campground.save(function(err){
                                  if (err) console.log(err);
                                });
                                console.log("created comments");
                              }
                            });
              }
            })
          })
        }
      })

    }
  });
}



module.exports= seedDB;



