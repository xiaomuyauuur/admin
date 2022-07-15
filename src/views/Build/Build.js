import Qfpage from "../../components/Qfpage/Qfpage";
import './style.scss'
import { addBuild as _addBuild, getAllBuild, delBuild, editBuild } from "../../api/build";
import { useState, useEffect, useCallback } from "react";
import { Button, Modal, Input, message } from 'antd';
import _ from 'lodash'  // 使用lodash类库  引入的变量名是 _

const Build = () => {

    const [buildList, setBuildList] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getBuildList();
    }, [])

    const getBuildList = useCallback(async () => {
        const res = await getAllBuild({});
        setBuildList(res.data)  // 修改楼栋数组
        setTotal(res.count)
    }, [])


    // 添加弹窗是否显示
    const [showAddBox, setShowAddBox] = useState(false);
    const showAdd = useCallback(() => setShowAddBox(true), []);
    const cancelAdd = useCallback(() => setShowAddBox(false), [])

    const [buildName, setBuildName] = useState('')

    // 得到一个防抖函数
    const _setBuildName = _.debounce((val) => { setBuildName(val) }, 300)


    const addBuild = async () => {
        let res = await _addBuild({ name: buildName, floorInfo: [] })
        const { success } = res;
        if (!success) return message.warning('添加失败');
        message.info('添加成功');
        getBuildList(); //获取最新列表
        cancelAdd();  //关闭弹窗
    }


    // 声明楼栋基本信息的状态
    const [curBuild, setCurBuld] = useState({});


    // 声明一个 删除确定的对话框
    const confirm = () => {
        Modal.confirm({
            title: '是否确定',
            content: '真的要删除吗',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                confirmDel()
            },
        });
    };

    // 确定删除楼栋
    const confirmDel = async () => {
        let res = await delBuild({
            buildid: curBuild._id
        })
        const { success } = res;
        if (!success) return message.warning('删除失败');
        message.success('删除成功')
        getBuildList();  //删除后刷新楼栋信息
    }


    // 修改楼栋的业务逻辑
    const [showEditBox, setShowEditBox] = useState(false)
    const [editName, setEditName] = useState('')
    useEffect(() => {
        if (curBuild.name) setEditName(curBuild.name)
    }, [curBuild])

    const handleEdit = async () => {
        let res = await editBuild({
            buildid: curBuild._id,
            name: editName,
            floorInfo: curBuild.floorInfo
        })
        const { success } = res;
        if (!success) message.warning('修改失败');
        message.success('修改成功')
        getBuildList(); //修改成功刷新楼栋列表
        setShowEditBox(false); //修改成功隐藏弹窗
    }




    return (
        <Qfpage title="楼栋楼层">
            <div className="howmuch">一共有 {total} 栋楼</div>
            {/* 楼栋列表 */}
            <div className="buildList">
                {buildList.map(item => (
                    <div
                        key={item._id}
                        onClick={() => setCurBuld(item)}
                        className={item.name === curBuild.name ? 'ac' : ''}
                    >
                        {item.name}
                    </div>
                ))
                }

                <Button shape="round" onClick={showAdd}>添加楼栋</Button>
            </div>

            {/* 楼栋的基本信息 */}
            <div>
                楼栋名:{curBuild.name} 共 {curBuild.floorInfo?.length} 层 共 x 间

                <Button
                    size="small"
                    style={{ marginLeft: '15px' }}
                    onClick={() => setShowEditBox(true)}
                >
                    修改
                </Button>
                <Button
                    size="small"
                    style={{ marginLeft: '15px' }}
                    onClick={confirm}
                >删除</Button>
            </div>



            {/* 添加楼栋弹窗 */}
            <Modal
                visible={showAddBox}
                onClose={() => {
                    setShowAddBox(false)
                    setBuildName('')
                }}
                onOk={addBuild}
                okText="立即添加"
                cancelText="取消"
                onCancel={cancelAdd}
            >
                <div>
                    <Input
                        placeholder="输入楼栋名称"
                        onChange={(val) => setBuildName(val.target.value)}
                        value={buildName}
                    />

                </div>
            </Modal>



            {/* 修改楼栋信息 */}
            <Modal
                visible={showEditBox}
                onCancel={() => {
                    // 关闭弹窗
                    setShowEditBox(false)
                    setBuildName('')
                }}
                onOk={handleEdit}
                okText="立即修改"
                cancelText="取消"
            // onCancel={cancelAdd}
            >
                <div>
                    <Input
                        placeholder="输入楼栋名称"
                        onChange={(val) => setEditName(val.target.value)}
                        value={editName}
                    />

                </div>
            </Modal>

        </Qfpage>
    )
}

export default Build;