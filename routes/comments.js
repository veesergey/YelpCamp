var express    = require('express');
var router     = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment    = require('../models/comment');
var middleware = require("../middleware");

// New Route - Shows the form for creating a new comment for a particular campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
    // Find campground using mongoose model method and the id from the req params
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            // Basic Error Handling
            console.log(err);
        }else{
            // If everything is good render the new comment form, and pass it the found campground
            res.render('comments/new', {campground: campground});
        }
    })
});

// Create Route - Handles the comment creation
router.post("/", middleware.isLoggedIn, (req, res) => {
    // Look Up campground using ID
    Campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        }else{
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    req.flash("error", "Something went wrong!");
                    console.log(err);
                }else{
                    // Add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // Save comment
                    comment.save();
                    // Add the comment to the campground
                    campground.comments.push(comment);
                    campground.save();
                    console.log('Comment added to ' + campground.name);
                    // Flash message, letting the user know they created a comment successfully
                    req.flash("success", "Successfully added comment.");
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
})

// Edit Comment Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    })

})

// Update Comment Route
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

// Destroy Comment Route
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.deleteOne({_id: req.params.comment_id}, (err) => {
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

module.exports = router;