import mongoose from "mongoose";

mongoose.connect("mongodb+srv://muraliaari2:Mongo123@cluster0.hjp95kc.mongodb.net/UserDetails").then( () => console.log("connected"))
.catch( ()=> console.log('failed to connect'))

const newSchema = new mongoose.Schema({
    name : {
        type:String,
        required : true
    },
    userName : {
        type: String,
        required : true,
    },
    
    password : {
        type: String,
        required : true
    }
})

const UserDetailsData = mongoose.model('UserDetailsData', newSchema)

//imagae
const imageScheme =new mongoose.Schema({
    username : String,
    img : String,
    randomNum : Number
})

const ImageModel = mongoose.model('Image', imageScheme)


//image schema  


export {UserDetailsData, ImageModel}