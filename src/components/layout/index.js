import style from './index.module.css' // 解决了样式命名冲突的问题
import './index.scss'
import Topnav from './TopNav';  // 头部菜单
import SlideNav from './SlideNan'; // 侧边菜单

import { Layout } from 'antd';  // 引入antd
import React from 'react';
import { Outlet } from 'react-router-dom';
const { Header, Content, Sider } = Layout;



const Abox = () => {
    return (
        <div className={style.layout} id="layout">
            <Layout>
                {/* 头部 */}
                <Topnav></Topnav>
                <Layout>
                    {/* 侧边栏 */}
                    <Sider  style={{ background:'#fff' }}>
                        <SlideNav />
                    </Sider>

                    <Layout>
                        <Content
                            className='site-layout-background'
                            style={{
                                // padding: 24,
                                margin: 0,
                                minHeight: 649,
                                background: '#fff'
                            }}
                        >
                            {/* 功能区 */}
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}

export default Abox