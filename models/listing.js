const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");

const listingSchema = new Schema({
    title: {
        type: String,
    },

    description: {
        type: String,
    },

    image: {
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=andrea-davis-IWfe63thJxk-unsplash.jpg",

            set: v => v === ""
                ? "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&dl=andrea-davis-IWfe63thJxk-unsplash.jpg"
                : v
        },

        filename: {
            type: String,
            default: "listingimage",
        },
    },

    price: Number,

    location: String,

    country: String,

    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }]
});


// DELETE REVIEWS WHEN LISTING IS DELETED
listingSchema.post("findOneAndDelete", async function (listing) {

   

    if (listing) {

        console.log("Deleted listing:", listing._id);
        console.log("Reviews:", listing.reviews);

        await Review.deleteMany({
            _id: {
                $in: listing.reviews
            }
        });

        
    }
});


const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;