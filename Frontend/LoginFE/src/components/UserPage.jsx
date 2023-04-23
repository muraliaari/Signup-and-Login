import {React, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { addDetails } from '../slice';
import axios from 'axios'
import TextField from '@mui/material/TextField';

let flag = false
let newArray = []

const UserPage = () => {

const [realName, setRealName] = useState('')
const dispatch = useDispatch()
const [userNAme, setName] = useState('')
const [image, setImage] = useState('')
const state = useSelector((state) => state.counter.username) 
const [imagePath, setImagePAth] = useState('')
const [listOfData, setListOfData]= useState([])
const [randn, setRandn] = useState('')
const [filePassword, setFilePassword] = useState('')
const [imagedisplay, setImageDisplay] = useState("");
const [close, setClose] = useState(false)
//console.log('From userpage.js', state)


//
//console.log(image, 'this is from userpage image')

//for getting the username and name on the userPage
try{
      //mounting phase
        useEffect(()=>{
          var getName = localStorage.getItem('userName')
          var name = localStorage.getItem('name')
          console.log(name, 'is user hesar')
    console.log(getName, 'local')
    setName(getName)
    console.log(userNAme)
    console.log(state)

        })
      
     axios.post('http://localhost:8000/userPage', {
      userNAme,
      
      
    }).then(res =>{
      console.log(res.data.data.name, 'from ai')
      setRealName(res.data.data.name)
      //console.log('from userPAGE', res.data.data.name)
     
      //setName((res.data.data.name))
      //console.log(usersNAme, 'from userPage')
    })//get the response from the api

} catch(err) {
  console.log(err)
}

//Convering the image to base64
const handleImageInput=(e)=>{
  setImage(e.target.files[0])
  var reader = new FileReader();
  reader.readAsDataURL(e.target.files[0])
  reader.onload=()=>{
    //console.log(reader.result)
    setImageDisplay(reader.result)
  }
  reader.onerror=(err)=>{
    console.log("error", err)
  }
}

//Add button
const handleImages =async(e)=>{
  e.preventDefault()
   
  const formdata = new FormData()
  formdata.append('username', userNAme)
  formdata.append('image', image)
  
  if(image){ //checking if the image exists or not
  try{
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
   setRandn(randomNum)
   formdata.append('randomNum', randomNum)
    //console.log(image, 'image')
    const response = await axios.post("http://localhost:8000/users/add", formdata)
    const record = response.data
    //console.log(response.data) //here getting array. destructure it to get the list of the images
    //console.log(image.name, 'form')
    
       
  } catch(err){
    console.log(err)
    }
}
else{
  alert("please select an Image first")
}
}

//get the image 
//view button
const handleImageList=async()=>{
  setClose(true)
  console.log(userNAme, 'in view')
  try{
    const data={
      userNAme
    }
    const res = await axios.post("http://localhost:8000/image", data )
   // console.log(state)
  //console.log(res.data)
    setListOfData(res.data)
    //console.log(res.data)
    
    newArray.length = res.data.length
    //console.log(res.data.length)
    for(let i=0; i<newArray.length;i++){
      newArray[i] = res.data[i].randomNum
    }
    //console.log('new', newArray)
    
  } catch(err){
  }
} 

const handleRandomNo=(event)=>{
  //setFilePassword(event.target.value)
  console.log(event.target.value)
  
}

//delete the images
  const handleDeleteImage=async(index)=>{
    
    //console.log(filePassword)
    for(let i=0; i<newArray.length;i++){
      //console.log(randnArray[i], randnArray.length)
      if(filePassword == newArray[i])
      flag = true
    }

    const data ={
      filePassword,
      userNAme
    }

    if(flag == true){
      flag = false

    try{
      let response = await axios.post("http://localhost:8000/deleteImage", data)
      //console.log(response.data)
      setListOfData(response.data)
      
      newArray.length = response.data.length
     // console.log(response.data.length)
      for(let i=0; i<newArray.length;i++){
        newArray[i] = response.data[i].randomNum
        }
        //console.log('new', newArray)
        alert("Deleted Image successfully")
        setFilePassword('')
        
    } catch(err){
      console.log(err)
    }}  
    else{
      alert("File password wrong or Already Deleted")
      setFilePassword('')
    }
  }
  
  const handleClose=()=>{
    setClose(false)
  }

  return (
    <div className="gradient-custom-2">
    <div className="" style={{maxWidth: "108rem"}}>
      <h1 style={{fontSize:"60px"}}>Welcome <span>{realName}</span></h1> <h5 style={{marginLeft:"900px", marginTop:"-50px", color:"antiquewhite"}}>Username : {userNAme}</h5><br/>
      <div className="card text-bg mb-3" style={{backgroundColor:"#66000000", width: "25rem",height:"20rem", marginLeft:"900px", position:"absolute"}}>
  <div className="card-header">Image password : <span style={{fontSize:"35px", color:"black"}}>{randn}</span></div>
  <div className="card-body">
    <h5 className="card-title">Image</h5>
    {imagedisplay=="" || imagedisplay==null?"" : <img width={250} height={150} src={imagedisplay} ></img>}
   
  </div>
</div>
      
  <div className="card-header" ></div>
  <div className="card-body"><br/>
    <h5 className="card-title">Select an Image</h5>
    
    <input multiple type='file' name="image" onChange={handleImageInput}/>  &nbsp;   &nbsp; <br/>
    <br/>
    <button className ="custom-btn btn-16" onClick={handleImages} style={{width:"500px"}}><span>Add Image</span></button>
    <div> <br/>
    <span style={{color:""}}>Enter the password of the image to delete: </span>
     <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
           value={filePassword} 
           onChange={(e)=> setFilePassword(e.target.value)}
        />
    &nbsp; <button className='custom-btn btn-16' onClick={handleDeleteImage}>Delete</button> 
    </div>
    
    <div className='frame'>
    
    </div>
    <p>Click to View the images list</p> <button className ="custom-btn btn-15" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={handleImageList} style={{marginLeft:"", width:"200px"}}>View Images</button> <br/>
          <br/>
    <h5 className="card-title">List of Images</h5>
   
    <div className='gradient-custom-2' style={ close ? { display:""} : {display:'none'}}>
    <div className="list-group">
       Close<button type="button" class="btn-close btn-close-white" aria-label="Close" onClick={handleClose}></button>
      {
        listOfData.map((ele, i)=>(
          <ol className="list-group list-group">
            <li className="list-group-item list-group-item-success" key={i}>{ele.img}</li>
          </ol>
          
        ))
      }
    </div>
    </div>
    
    
  </div>
  
  <img src={imagePath}></img>
</div>

    
</div>
  )
}

export default UserPage   