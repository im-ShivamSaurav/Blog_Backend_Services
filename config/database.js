const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () =>{
    mongoose.
        connect(process.env.DATABASE_URL, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        ).
        then(()=>{
            console.log("DATABASE Successfully connected");
        }).
        catch((err)=>{
            console.error(err);
            console.error("Database connection error");
            process.exit(1);
        })
}

module.exports = dbConnect;