# Wanderlust

An Airbnb-inspired accommodation listing web application built using Node.js, Express.js, MongoDB and EJS.

## Project Status

🚧 Currently in development.

## Current Features

* View all listings
* View individual listing details
* Add a new listing
* Edit existing listings
* Delete listings
* Listing validation using Joi
* Error handling with custom Express errors
* Add reviews to listings
* View reviews on individual listings
* Delete reviews
* Review validation using Joi
* Automatic deletion of associated reviews when a listing is deleted

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* EJS
* EJS-Mate
* Joi
* Bootstrap
* Method-Override

## Project Structure

`
Wanderlust/
│
├── models/
│   ├── listing.js
│   └── reviews.js
│
├── views/
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── show.ejs
│   │   ├── new.ejs
│   │   └── edit.ejs
│   └── layouts/
│
├── public/
│   └── css/
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── app.js
├── schema.js
├── package.json
└── README.md


## Reviews Module

The Reviews module allows users to:

* Add a rating and comment to a listing
* View all reviews associated with a listing
* Delete individual reviews
* Automatically remove associated reviews when a listing is deleted

Reviews are stored separately in MongoDB and referenced from the corresponding listing using MongoDB ObjectIds.

## Validation

* Listing data is validated using Joi.
* Review data is validated using Joi.
* Custom Express error handling is used for invalid requests and missing routes.

## Future Improvements

* User authentication and authorization
* User-specific listings and reviews
* Improved UI and responsiveness
* Deployment
* Additional listing and review features
