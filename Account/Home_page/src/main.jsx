import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HHS from './HHS.jsx'
import AboutUs from './AboutUs.jsx';
import Candidates from './Candidates.jsx';
import { createBrowserRouter, RouterProvider as ReactProvider } from 'react-router-dom';
import Companies from './Companies.jsx';
import SignIn from '../../Create-Account/src/Ask.jsx'

let allroutes = createBrowserRouter([
  {
    path: "/",
    element: <HHS />
  },
  {
    path: "about-us",
    element: <AboutUs />
  },
  {
    path: "Candidates",
    element: <Candidates />
  },
  {
    path: "Companies",
    element: <Companies />
  },
  {
    path:'Create-Account',
    element:<SignIn/>
  }
]);

createRoot(document.getElementById('root')).render(
  <ReactProvider router={allroutes} />
)
