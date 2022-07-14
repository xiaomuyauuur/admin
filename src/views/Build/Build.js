import Qfpage from "../../components/Qfpage/Qfpage";
import './style.scss'
import { addBuild, getAllBuild } from "../../api/build";
import { useState, useEffect, useCallback } from "react";
import { Button, Modal, Checkbox, Form, Input } from 'antd';
import _ from 'lodash'  // 使用lodash类库  引入的变量名是 _

const Build = () => {

    const [buildList, setBuildList] = useState([]);

    useEffect(() => {
        getBuildList();
    }, [])

    const getBuildList = async () => {
        const res = await getAllBuild({});
        console.log('res', res)
    }

    // 添加弹窗是否显示
    const [showAddBox, setShowAddBox] = useState(false);
    const showAdd = useCallback(() => setShowAddBox(true), []);
    const cancelAdd = useCallback(() => setShowAddBox(false), [])

    const [buildName, setBuildName] = useState('')

    // 得到一个防抖函数
    const _setBuildName = _.throttle((val)=>{setBuildName(val)},300)

    return (
        <Qfpage title="楼栋楼层">
            <div className="howmuch">一共有 xxx 栋楼</div>
            <div className="buildList">
                <div>第一栋</div>
                <div>第一栋</div>
                <div>第一栋</div>
                <Button shape="round" onClick={showAdd}>添加楼栋</Button>
                <></>
            </div>

            <Modal
                visible={showAddBox}
                onClose={() => setShowAddBox(false)}
                onConfirm={() => { }}
                okText="立即添加"
                cancelText="取消"
                onCancel={cancelAdd}
            >
                <div>
                    {buildName}
                    <Input
                        placeholder="输入楼栋名称"
                        onChange={(val) =>_setBuildName(val)}
                    />

                </div>
            </Modal>
        </Qfpage>
    )
}

export default Build;