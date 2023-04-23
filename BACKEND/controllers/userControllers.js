import {UserDetailsData, ImageModel} from "../models/userModels.js"


const getUserImage = async(req, res)=>{
   try {
   // console.log(req.file)
    let img = (req.file) ? req.file.originalname : null
    let username = req.body.username
    let randomNum = req.body.randomNum
    console.log(img)
    let data ={
        username,
        img, 
        randomNum
    }
    //console.log(data)
    //const dataList = await ImageModel.findOne({username : username})
        
        await ImageModel.insertMany([data])
        console.log('insertion done')
        //res.status(200).json({message : 'Added image successfully'})
        const alldata = await ImageModel.find({ username : username})
        //console.log(alldata)
        //console.log(dataList, data)
        //console.log(alldata.img)
        //console.log(dataList)
        res.json({
            alldata
        })
        


    
   } catch(err) {
    console.log("error in image kinda", err)
   }

}

//for signup
const userSignupData = async(req, res)=>{
    const {name, userName, password} = req.body
    //console.log(userName, password)
    let data = {
        name : name,
        userName: userName,
        password : password
    }

    try{
        const check  = await UserDetailsData.findOne({userName : userName})
        //console.log(check)
        if(check){
            res.json({
                status : 'Failed',
                data : check
            })
            console.log('duplicate data')
        }
        else{
            res.json({
                status : 'success',
                data : data
            })
        await UserDetailsData.insertMany([data])
        }
        //console.log(data)
    } catch(err){
        console.log(err)
    }
}

//for login details
const loginCredentials = async(req, res)=>{
    try{
        const {userName, password} = req.body
    const data = {
        userName,
        password
    }

    const check = await UserDetailsData.findOne({userName : userName})
    //checking if data is present or not
    //sending the data to the login page
    
       if(check){
        res.json({
            status : 'success',
            data : check
        })
       }
       else{
        res.json({
            status : 'failed',
            data : 'no data'
        })
       }
    
    
    } catch(err){
        console.log(err)
    }

}
/*
const getAllUser = async(req, res)=>{
    try{
        const allUser = await UserDetailsData.find()
        res.send({
            status : 'success',
            data : allUser
        })
    console.log("getAlluser done")
    }  catch(err){
        console.log(err)
    }
}
*/

//for userpage
const getUserDetailsOfUser = async(req, res)=>{

    const username = req.body.userNAme
    //console.log(username)
    
    try{
       const user = await UserDetailsData.findOne({userName : username})
      // user.files.push("hi")
       //await user.sava()
       
        //console.log(user)
        res.json({
            status : "success",
            data : user
        })
        
    } catch(err){
        console.log(err)
    }
}

//Uploading images post


//get all images

const getAllImages = async(req, res)=> {
    const username= req.body.userNAme
    console.log(username)
    //console.log(username)
    const allImages = await ImageModel.find({username : username})

    res.json(allImages)
}

//delete images
const deleteImages = async(req, res)=>{
    try{
        //console.log(req.body ,'from delee api')
        const password = req.body.filePassword
        const username = req.body.state
       // console.log(req.body)
        const deleteImage = await ImageModel.findOneAndDelete({randomNum : password})
        //console.log(deleteImage)
        const alldata = await ImageModel.find({username : username})
        //console.log(alldata)
        res.json(alldata)

    } catch(err){
        console.log(err)
    }

}




export  {userSignupData, loginCredentials, getUserDetailsOfUser,  getAllImages, getUserImage, deleteImages}