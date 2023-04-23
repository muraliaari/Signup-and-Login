import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import UserPage from './UserPage';
import {useSelector, useDispatch} from 'react-redux'
import { addDetails } from '../slice';
//import UserDetailsData from '../../../../BACKEND/models/userModels';

const Login = () => {

  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  let navigate = useNavigate();

  const dispatch = useDispatch()
  const state = useSelector((state) => state.counter.username)  

  const handleUsername = (event)=>{
    setUsername(event.target.value)

  }

  const handlePassword = (event)=>{
    setPassword(event.target.value)
  }

  const handleLogin = async(e)=>{
    e.preventDefault()
    console.log(userName, password)
    if(localStorage){
      var name = localStorage.setItem('userName', userName)
    }
    try{
      await axios.post('http://localhost:8000/login', {
        userName,
        password
      }).then(res => {
        console.log('from login', res.data.data)
        if(res.data.data == 'no data'){
          alert('PLease check your username or Signup')
          //navigate('/signup')
        }//if user is present
        if(res.data.data.userName === userName && res.data.data.password === password){
          console.log('user already exists in DB')
          navigate('/userPage')
          dispatch(addDetails(userName, password))
          console.log('dispatched', state)
        }
        else
        if(res.data.data.password != password && res.data.data.userName === userName){
          alert("Please check your passord")
        }
        
        
      })
    } catch(err){
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
    <div  style={{ marginTop : "-20px", padding : "85px"}}>
      
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"  
    >
      <h1>Login</h1>
      <p className="text-50 mb-5">Please enter your login and password!</p> 
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
        <div className="d-grid gap-2">
          <button className="button-30"  style={{width:"250px"}} type="button" onClick={handleLogin}>Login</button>
        </div><br/>
        <h2>Don't have an account?</h2><button className="button-30"  style={{width:"250px"}} onClick={()=>navigate('/signup')}>SignUp</button>
        
          
   
</div>
    </div>
    </div>
  )
}

export default Login