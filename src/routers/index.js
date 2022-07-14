import { useRoutes, Navigate } from "react-router-dom";
import React , { lazy } from "react";
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";
import Layout from "../components/layout/index";
import Go from "../views/Go/Go";


// 路由懒加载
const Room = lazy(() => import('../views/Room/Room'));
const Build = lazy(() => import('../views/Build/Build'));


// 独立页面
const frameOut = [
    { path: '/login', element: <Login /> },
    { path:'/go',element:<Go /> }
]


// 功能页面
const frameIn = [
    { path: 'index', element: <Home /> },
    { path: 'setbuild', element:<Build /> },
    { path: 'setroom', element: <Room />},
    { path: '*', element: <Navigate to="/index" /> },
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