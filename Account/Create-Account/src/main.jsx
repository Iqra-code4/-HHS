import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './AuthApp.jsx'
import Ask from './Ask.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AuthApp from './AuthApp.jsx'
import Hired from '../../candidateProfile/src/App.jsx'

let allRoutes = createBrowserRouter([
    {
        path:'/',
        element:<Ask/>
    },
    {
        path:'hire',
        element:<App/>
    },
    {
        path:'get_hired',
        element:<Hired/>
    }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={allRoutes} />
)
