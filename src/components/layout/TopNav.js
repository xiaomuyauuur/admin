import { Layout, Menu } from "antd"
import React from "react";
// import { useSelector } from "react-redux";
import { setCurMenu } from "../../store/commonSlice";
const { Header } = Layout;



const itemsl = ['首页', '管理'].map((key) => ({
    key,
    label: `${key}`,
}));

const Topnav = () => {
    // const menu = useSelector((state) => state.common.menu);
    // console.log('menu',menu)
    const handleChange = (keyPath) => {
        console.log(keyPath)
    }
    return (
        <Header onChange={handleChange}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['首页']} items={itemsl} />
        </Header>
    )

}

export default Topnav