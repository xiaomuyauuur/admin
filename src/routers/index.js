import { useRoutes, Navigate } from "react-router-dom";
import React from "react";
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";
import Layout from "../components/layout/index";



// 独立页面
const frameOut = [
    { path: '/login', element: <Login /> },
]


// 功能页面
const frameIn = [
    { path: 'index', element: <Home /> },
    { path: '*', element: <Navigate to="/index" /> }
]

const Router = () => {
    let element = useRoutes([
        ...frameOut,
        {path:'/',element:<Navigate to="/index" />},
        {path: "/", element: <Layout />, children: frameIn},

    ]);

    return element
}

export default Router;