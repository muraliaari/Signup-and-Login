import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { store } from './store'
import { Provider } from 'react-redux'
import * as dotenv from 'dotenv'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routerLogin from './routes';
import Login from './components/Login'

const router = createBrowserRouter(routerLogin)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router}>
    <Login/>
    </RouterProvider>,
</Provider>,
  
)
