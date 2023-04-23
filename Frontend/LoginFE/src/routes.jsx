import App from "./App"
import Login from "./components/Login"
import Signup from "./components/Signup"
import UserPage from "./components/UserPage"


const routerLogin = [
    {
      path: "/",
      element: <Login/>
      
    },
    {
      path: "login",
      element: <Login/>,
     
    }, 
    {
      path: "signup",
      element: <Signup/>,
    },

      {
        path: "userPage",
        element: <UserPage/>,
      },
  ]

  export default routerLogin