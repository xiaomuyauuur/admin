import { Layout, Menu } from "antd"
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurMenu } from '../../store/commonSlice'
import logo from '../../assets/house.png'
const { Header } = Layout;


const Topnav = () => {

    const menu = useSelector((state) => state.comon.menu)
    const curMenu = useSelector(state => state.comon.curMenu)
    // console.log('menu',menu)

    const dispatch = useDispatch();
    const handleOclick = ({ key }) => {
        console.log(key)
        dispatch(setCurMenu(key))
    }


    return (
        <Header className="header">
            {/* <div className="logo"></div> */}
            <Menu
                theme="dark"
                mode="horizontal"
                onClick={handleOclick}
                defaultSelectedKeys={curMenu}
                items={menu.map(item => ({
                    label: item.name,
                    key: item.name
                }))} />
        </Header>
    )

}
export default Topnav;