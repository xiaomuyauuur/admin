import style from './index.module.css' // 解决了样式命名冲突的问题
import './index.scss'

import { Layout } from 'antd';  // 引入antd
import React from 'react';
import { Outlet } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;


const Abox = () => {
    return (
        <div className={style.layout} id="layout">
            <Layout>
                {/* 头部 */}
                <Header>Header</Header>
                <Layout>
                    {/* 侧边栏 */}
                    <Sider>Sider</Sider>
                    <Layout>
                        <Content>
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