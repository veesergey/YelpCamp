# YelpCamp
YelpCamp, a website that lets people review campgrounds and share their experiences with others.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
The purpose of this project is to further my skills in programming by learning full stack web development. This the first
website I've actually hosted and theres more functionality and depth to the backend than anything I've done before. The latest change with this project is that its now also hosted through Amazon as well as Heroku! Using Terraform I created an EC2 instance running a Linux Server that is now hosting this web application.

## Technologies
* Express - 4.17.1
* Mongoose - 5.8.1
* NodeJS
* MongoDB
* AWS
* Google Maps API
* Terraform

The app was first hosted through [heroku](https://www.heroku.com/) and is now also hosted on the AWS Cloud! The database is hosted through MongoDB Atlas.

On the AWS side of things, the app is running on the Amazon Linux 2 AMI. PM2 is being used in order to keep the application up and running in case of it crashing or the EC2 instance being rebooted.


## Setup
No setup necessary! This application is currently live and can be found at [www.veesergey.com](http://www.veesergey.com). NOTE: Currently not live as this application is no longer maintained. Its purpose has been served.

## Features
List of features
* Anyone can create an account and add new campground reviews. 
* You can see all submitted campgrounds and leave comments on other peoples submission.
* When submitting campgrounds an address can be added and the location is shown to you by Google Maps.

To-do list:
* An improved comment section featuring peoples avatars.
* A better profile for users including an about me, so others can get to know their fellow campers better!

## Status
Project is: _in progress_. The goal here is to learn more and keep improving. I believe that one learns best by doing, so I'm going
to keep trying to add new and fun things!

## Inspiration
This website is based on [Colt Steele's Web Developer course](https://www.udemy.com/course/the-web-developer-bootcamp/). 
Colt is an amazing instructor and I'm glad his course was introduced to me because it really helped pave the way into web development.

## Contact
Created by me! Veesergey. Feel free to contact me through my github or my [linkedIn!](http://www.linkedin.com/in/veesergey)
