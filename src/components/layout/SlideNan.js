import { Layout, Menu } from "antd"
import { useSelector } from "react-redux";  // useSelector 获取全局状态
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;

const SlideNan = () => {

    const commonMenuInfo = useSelector(state => state.comon)
    // console.log(commonMenuInfo)

    const subMenu = commonMenuInfo.menu.find(item => item.name == commonMenuInfo.curMenu).children || [];

    // const menuClick = (url)=>{
    //     console.log('菜单点击了',url)
    // }

    const navigate = useNavigate();
    const menuClick = (res) => {
        // 跳转
        // ?? url 
        const url = subMenu.find(item => item.name == res.key).url
        navigate(url)
        console.log(url)
    }

    return (

        <Sider>
            <Menu
                mode="inline"
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                onClick={menuClick}
                style={{
                    height: '100%',
                    borderRight: 0,
                }}
                items={subMenu.map(item => ({
                    label: item.name,
                    key: item.name,
                    url: item.url
                }))}
            />
        </Sider>

    )

}

export default SlideNan