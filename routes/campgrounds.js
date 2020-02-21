var express    = require('express');
var router     = express.Router();
var Campground = require('../models/campground');
var middleware = require("../middleware");

// Geocoder (Google Maps)
var NodeGeocoder = require('node-geocoder');


var options = {
    provider: 'google',
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

var geocoder = NodeGeocoder(options);

// Index Route - Shows all campgrounds
router.get("/", (req, res) => {
    // Get All campgrounds from the DB
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log(err);
        }else{
            // Render the file
            res.render("campgrounds/index", {campgrounds: allCampgrounds, page: 'campgrounds'});
        }
    })

});


// New Route - Shows form for new campgrounds
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// Create Route - Handles the logic for campground creation
router.post("/", middleware.isLoggedIn, (req, res) => {
    // Assigns all the inputs to campgrounds variables (to be passed to the campground object further down)
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };

    // Get coordinates from address input
    geocoder.geocode(req.body.location, (err, data) => {
        //Was getting a weird input here previously.
        if (err|| !data.length) {
            req.flash('error', 'Invalid Address');
            return res.redirect('back');
        }
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var location = data[0].formattedAddress;

        var newCampground = {
            name: name,
            price: price,
            image: image,
            description: desc,
            author: author,
            location: location,
            lat: lat,
            lng: lng
        };
        // Create a new campground
        Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                console.log(err);
            }else{
                console.log('Created new campground.');
                res.redirect("/campgrounds");
            }
        });
    });
});

// Show Route - Shows more details about one campground
router.get("/:id", (req, res) => {
    // Get ID from request
    var id = req.params.id;

    // Mongoose Model Method to Find By Id
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
});

// Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    geocoder.geocode(req.body.campground.location, (err, data) => {
        if (err || !data.length) {
            req.flash('error', 'Invalid Address');
            console.log(err);
            return res.redirect('back');
        }
        req.body.campground.lat = data[0].latitude;
        req.body.campground.lng = data[0].longitude;
        req.body.campground.location = data[0].formattedAddress;

        Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
            if (err) {
                req.flash("error", err.message);
                res.redirect("back");
            }else{
                req.flash("success", "Successfully Updated");
                res.redirect("/campgrounds/" + updatedCampground._id);

            }
        });
    })


});

// // Destroy Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.deleteOne({_id: req.params.id}, (err) => {
        res.redirect("/campgrounds");
    })
})

module.exports = router;