require('dotenv').config(); // Npm package for handling environment variables

// Packages Declarations
const express        = require('express'),
      bodyParser     = require('body-parser'),
      mongoose       = require('mongoose'),
      flash          = require('connect-flash'),
      Campground     = require('./models/campground.js'),
      seedDB         = require('./seeds'),
      Comment        = require('./models/comment.js'),
      passport       = require('passport'),
      LocalStrategy  = require('passport-local'),
      User           = require('./models/user.js'),
      methodOverride = require('method-override');



// Route Dependencies
var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');

const app = express();

// Passport Configuration. WARNING: FOR SOME REASON, this needs to be above bodyParser. I am not sure why.
app.use(require("express-session")({
    secret: "Once again, Leo wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

// Express Setup
app.locals.moment = require('moment'); // The require is down here so I can assign it to app.locals right away
app.set('view engine', 'ejs'); // View Engine
app.use(bodyParser.urlencoded({extended:true}));  // Allows use of body parser
app.use(methodOverride("_method"));         // Allows PUT method to be used for RESTful Routes
app.use(flash());                                 // Allows the use of flash messages

// Public Style Sheet
app.use(express.static(__dirname + "/public"));

// Mongoose Setup
mongoose.set('useFindAndModify', false);
//mongoose.set('useNewUrlParser', Strue);
//mongoose.set('useUnifiedTopology', true);

// Mongoose Database Connection
// mongoose.connect("mongodb://localhost/yelp_camp");
var uri = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";



// New Mongoose Connection Code Block
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }).
then(() => console.log('Connected')).
catch(err => console.log('Caught', err.stack));

// seedDB(); // Seed the database

// Authentication Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware function that is called on every route, letting req.user/flash('error' be used on every page
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// =========================
// Routes
// =========================
// Index Routes
app.use("/", indexRoutes);
// Campground Routes
app.use("/campgrounds", campgroundRoutes);
// Comment Routes
app.use("/campgrounds/:id/comments", commentRoutes);

// Server Start
app.listen(process.env.PORT || 3000, () => {
    console.log("Server has started");
});