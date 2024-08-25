const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//parsing
app.use(express.json());

//mounting
const blogRoutes = require('./routes/blog');
app.use("/api/v1", blogRoutes);



//server call
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

//default route
app.get("/", (req, res)=>{
    res.send("<h1>Welcome to Blog API</h1>");
});



//db connect
const dbConnect  = require("./config/database");
dbConnect();
