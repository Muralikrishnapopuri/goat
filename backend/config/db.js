const mongoose = require("mongoose");

const connectDb = async ()=>{
    try{
 const conn = await mongoose.connect(process.env.MONGODB_Url);
 console.log("DB Connected Successfully... "+conn.connection.host)

    }catch(err){
        console.log(err);
        process.exit(1);
    }
}
module.exports = connectDb;

