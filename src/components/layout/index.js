import { Suspense, useEffect } from 'react';
import style from './index.module.css' // 解决了样式命名冲突的问题
import './index.scss'
import { useSelector } from 'react-redux';
import Topnav from './TopNav';  // 头部菜单
import SlideNav from './SlideNan'; // 侧边菜单

import { Layout } from 'antd';  // 引入antd
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
const { Header, Content, Sider } = Layout;



const Abox = () => {

    const navigate = useNavigate();
    const adminInfo = useSelector(state=>state.admin.adminInfo);
    useEffect(()=>{
        if(!adminInfo) {
            MessagePlugin.info('信息丢失请重新登录', 3 * 1000);
            setTimeout(()=>{
                navigate('/login',{replace:true})
            },3000)
        }
    },{})

    return (
        <div className={style.layout} id="layout">
            <Layout>
                {/* 头部 */}
                <Topnav></Topnav>
                <Layout>
                    {/* 侧边栏 */}
                    <Sider style={{ background: '#fff' }}>
                        <SlideNav />
                    </Sider>

                    <Layout>
                        <Content
                            className='site-layout-background'
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 649,
                                background: '#fff'
                            }}
                        >
                            {/* 功能区 */}
                            <Suspense fallback={<div>Loading...</div>}>
                                <Outlet />
                            </Suspense>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}

export default Abox