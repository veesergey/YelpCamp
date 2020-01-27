// Required
var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");

// Middleware Goes Here
var middlewareObj = {};

// Checks if user is logged in, then checks if the user owns the campground.
// This middleware is used for editing/deleting campgrounds
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    // Is user logged in
    if (req.isAuthenticated()){
        // Does user own the campground
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err){
                req.flash("error", "Campground not found.");
                res.redirect("/campgrounds")
            }else if(foundCampground){
                if (foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
                        next();
                }else{
                        req.flash("error", "You don't have permission to do that.");
                        res.redirect("back");
                }
            }else{
                req.flash("error", "Something went wrong.");
                res.redirect("/campgrounds");
            }
        })
    }else{
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
};

// Same use and checks as the function above, but for comments
middlewareObj.checkCommentOwnership = function(req, res, next){
    // Is user logged in
    if (req.isAuthenticated()){
        // Does user own the campground
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err){
                res.redirect("/campgrounds")
            }else if(foundComment){
                // Does the user own the comment
                if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                }else{
                    req.flash("error", "You dont have permission to do that.");
                    res.redirect("back");
                };
            }else{
                req.flash("error", "Something went wrong.");
                res.redirect("/campgrounds");
            };
        })
    }else{
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    };
};

// Checks to see if user is logged in
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
};




module.exports = middlewareObj;

