import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";

import * as yup from "yup";



const Signup = () => {
  
  
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName]= useState("")
  const [msg, setmsg] = useState([])
  const navigate = useNavigate()

  //getting the resonse if data is same
 
const handleName = (event)=>{
  setName(event.target.value)
  

}
  const handleUsername = (event)=>{
    setUsername(event.target.value)

  }

  const handlePassword = (event)=>{
    setPassword(event.target.value)
  }

  const handleSignup = async(e)=>{
    e.preventDefault()
    console.log(userName, password)
    
    try{
      if(name && userName && password){
      await axios.post('https://login-and-signup.onrender.com/', {
      name,
      userName,
      password
    }).then(res => {
      console.log("from backend api", res.data.data)
      if(res.data.data.userName == userName){
        navigate('/login')
        console.log('data exits')

      }
    })
    } 
  else{
    alert('Feilds must not be empty')
  } }catch(err){
      console.log(err)
    }
    
    
   
  }
  return (
    <div>
      
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-success p-2 text-dark bg-opacity-50">
  <div className="container-fluid">
    
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/login">Login</a>
          
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/signup">Signup</a>
        </li>
       
      </ul>
    </div>
  </div>
</nav>
    <div style={{ marginTop : "", padding : "85px"}}>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <h1>Signup</h1>
      <p>Please enter your name, username and password</p>
      <TextField
          required
          id="outlined-required"
          label="Name"
          onChange={handleName}
          
          
        /> <br/>
      <TextField
          required
          id="outlined-required"
          label="username"
          onChange={handleUsername}
          
        /> <br/>
         <TextField
          required
          id="outlined-required"
          label="password"
          onChange={handlePassword}
          
        />
        
        
        </Box>
        <div className="d-grid gap-2">
        <br/>
          <button className="custom-btn btn-13" type="button" style={{width:"250px"}} onClick={handleSignup}>Signup</button>
        </div>

    </div>
    </div>
  )
}

export default Signup
