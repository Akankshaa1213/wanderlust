const express= require("express");
const app= express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const mongoose= require("mongoose");
const Listing= require("./models/listing.js");
const mongo_url= "mongodb://127.0.0.1:27017/wonderlust";
const path = require("path");
const methodoverride= require("method-override");
const ejsmate= require("ejs-mate")
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");
main().then(()=>
{
    console.log("connected succesfully");
}).catch((err)=>
{
    console.log(err);
});
async function main()
{
    await mongoose.connect(mongo_url);
} 

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodoverride("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "public")));


/*app.use((req,res,next)=>
{
    req.time= new Date(Date.now())
    console.log(req.method, req.hostname, req.path,req.time);
    next();
})*/

const validateListing= (req,res,next)=>
{

    let {error}= listingSchema.validate(req.body);
    console.log(error)
    if(error)
    {
        let errMsg= error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,errMsg)
    }
    else{
        next();
    }
}
//INDEX ROUTE
app.get("/listings",wrapAsync(async(req,res)=>
{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

//NEW ROUTE
app.get("/listings/new",(req,res)=>

    res.render("listings/new.ejs")
    
)

//SHOW ROUTE
app.get("/listings/:id", wrapAsync(async (req,res)=>
{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}));

// create Route
app.post("/listings",
    validateListing,wrapAsync(async(req,res, next)=>
{
    
     let newListing= new Listing(req.body.listing);
     await newListing.save();
     res.redirect("/listings");
})
);


//edit route
app.get("/listings/:id/edit", wrapAsync(async (req,res)=>
{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//update route
app.put("/listings/:id",validateListing,wrapAsync(async(req,res)=>
{
      let {id} = req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing});
     res.redirect(`/listings/${id}`);
}));

//Delete Route
app.delete("/listings/:id",wrapAsync(async (req,res)=>
{
    let {id} =req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}))

/*app.get("/testlisting", async(req,res)=>
{
    let samplelisting = new Listing({
    title:"my new villa",
    description:"by the beach",
    price:1200,
    location:"goa",
    country:"india",
    image: ""   //  force setter to run
});

    await samplelisting.save();
    console.log("sample was saved");
    console.log(req.body);
    res.send("successfull testing");

});*/

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
     res.status(statusCode).render("listings/error.ejs",{err});
   
});

app.listen(8080,()=>
{
    console.log("app listening on port 8080");
});