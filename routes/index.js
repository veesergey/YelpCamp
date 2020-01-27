var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var User     = require('../models/user');

// Landing Page Route - Link to Index Page
router.get("/", (req, res) => {
    res.render("landing");
});

// ============================
// Sign Up Routes
// ============================
// Show Register Form
router.get("/register", (req, res) => {
    res.render("register", {page: 'register'});
})

// Handles Sign Up Logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName});
    if (req.body.avatar){
        newUser.avatar = req.body.avatar;
    }
    if (req.body.adminCode === "secretcode123"){
        newUser.isAdmin = true;
    };
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        })
    })
});

// ==============================
// Login Routes
// ==============================
// Shows login form
router.get("/login", (req, res) => {
    res.render('login', {page: 'login'});
});

// Handles login logic
router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), function(req, res){
});

// Logout Route
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

// Show Profile Page for Current User
router.get("/profile/:id", (req, res) => {
    // Get user id from req
    var userId = req.params.id;
    // Mongoose Model Method to Find By Id
    User.findById(userId, (err, foundUser) => {
        if (err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            // Render Show Page
            res.render("users/show", {user: foundUser});
        }
    })
});

// Update Route for User Profile
router.put("/profile/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
        if (err){
            req.flash("error", err.message);
            res.redirect("back");
        }else{
            req.flash("success", "Successfully Updated User Information");
            res.redirect("/profile/" + updatedUser._id);
        }
    })
})

module.exports = router;