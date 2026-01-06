import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import SingleProduct from "../pages/SingleProduct";
import PublicRoute from "../AuthGuard/PublicRoute";
import PrivateRoute from "../AuthGuard/PrivateRoute";

export const router = createBrowserRouter([
    {
        element: <PrivateRoute/>,
        children: [
            {
                path: '/',
                element: <Home/>,  
            }
        ]
    },
    {
        element: <PublicRoute/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            }
        ]
    },
    {
        element: <PublicRoute/>,
        children: [
            {
                path: '/register',
                element: <Register/>
            }
        ]
    },
    {
        element: <PrivateRoute/>,
        children: [
            {
                path: '/cart',
                element: <Cart/>, 
            }
        ]
    },
    {
       
        element: <PrivateRoute/>,
        children: [
            {
                path: '/profile',
                element: <Profile/>, 
            }
        ]
    },
    {
        element: <PrivateRoute/>,
        children: [
            {
                path: '/product/:id',
                element: <SingleProduct/>, 
            }
        ]
    }
])