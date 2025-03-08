import dotenv from "dotenv";
import { connectDB } from "./db/indexDB.js";
import {app} from "./app.js";
dotenv.config({
    path: "./.env"
});

connectDB()
.then(() => {
    console.log("MongoDB connection successful");
})
.catch((err) => {
    console.log("MongoDB connection error: ", err);
})
.then(() => {
     app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port: ${process.env.PORT}`);
    });
 })
.catch((err) => {
    console.log("MONGO db connection failed!!!", err);
});










/*
const app = express()
(async () => {
    try { 
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) =>{
          console.log("Application is not able to talk to Database",error)
          throw error
        })

        app.listen(process.env.PORT,() =>{
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("Error")
        throw err
    }
})()
*/