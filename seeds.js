var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment    = require('./models/comment');

var data = [
    {
        name: "Cartoon Tent Camp",
        image: "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72297dd5954bc059_340.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam aspernatur autem cupiditate dolorem esse exercitationem facere facilis hic illum inventore nam nulla placeat, quas quisquam reiciendis sunt tenetur velit. Adipisci aliquam corporis culpa cum cupiditate eos facere fugiat incidunt ipsum, iusto nobis omnis optio perspiciatis quae, quasi, quis repudiandae.\n"
    },
    {
        name: "Murder Lake",
        image: "https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c72297dd5954bc059_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam aspernatur autem cupiditate dolorem esse exercitationem facere facilis hic illum inventore nam nulla placeat, quas quisquam reiciendis sunt tenetur velit. Adipisci aliquam corporis culpa cum cupiditate eos facere fugiat incidunt ipsum, iusto nobis omnis optio perspiciatis quae, quasi, quis repudiandae.\n"
    },
    {
        name: "Aurora Mountain",
        image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c72297dd5954bc059_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam aspernatur autem cupiditate dolorem esse exercitationem facere facilis hic illum inventore nam nulla placeat, quas quisquam reiciendis sunt tenetur velit. Adipisci aliquam corporis culpa cum cupiditate eos facere fugiat incidunt ipsum, iusto nobis omnis optio perspiciatis quae, quasi, quis repudiandae.\n"
    }
]

function seedDB(){
    // Remove All Campgrounds
    Campground.remove({}, (err) => {
        if(err){
            console.log(err);
        }else{
            console.log("removed campgrounds");
            // Add a few campgrounds
            data.forEach(function(campground){
                Campground.create(campground, (err, newCampground) => {
                    if(err){
                        console.log("Error with campground creation.");
                    }else{
                        console.log("Created new campground: " + newCampground.name);
                        // Add a few comments
                        Comment.create(
                            {
                            text: "I wish this place had internet...",
                            author: "Homer"
                            }, (err, newComment) => {
                                if(err){
                                    console.log("Problem with comment creation.");
                                }else{
                                    newCampground.comments.push(newComment);
                                    newCampground.save();
                                    console.log("Created new comment.");
                                }

                        })
                    }
                })
            })
        };
    })


}

module.exports = seedDB;