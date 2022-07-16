import Qfpage from '../../components/Qfpage/Qfpage'
import { getAllType, addType, delType, editType } from '../../api/roomType'
import { useState, useEffect, useMemo, useRef, useLayoutEffect } from "react"
import { Button, Table, Drawer, Radio, Space, InputNumber, Form, Input, message, Modal, Col, Row } from 'antd';

import { ExclamationCircleOutlined } from '@ant-design/icons';
const Room = () => {



    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(7);  // 单页数量
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0); // 总数
    // 获取表格数据的主函数
    const getData = async () => {
        const postData = { limit, page };
        if (name) postData.name = name
        if (price) postData.price = price

        let res = await getAllType(postData)
        const { success, data, count } = res;
        if (success) {
            setData(data);
            setTotal(count)
        };
    }


    // 条件过滤
    const [name, setName] = useState('');
    const [price, setPrice] = useState('')


    useLayoutEffect(() => {
        getData();
    }, [limit, page])

    const { confirm } = Modal;

    //删除房型的操作
    const confirmDel = async (id) => {
        let res = await delType({ typeid: id });
        const { success } = res;
        if (!success) return message.warning('删除失败')
        message.info('删除成功');
        getData();
    }

    //删除房型的提示框
    const handlerDel = (id) => {
        confirm({
            title: '温馨提醒',
            content: '你确定要删除当前的房型吗？？',
            okText: '是',
            cancelText: '否',
            onOk() {
                confirmDel(id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }



    const columns = useMemo(() => [
        { title: '房型名称', colKey: 'name' },
        { title: '床数量', colKey: 'beds' },
        { title: '价格', colKey: 'price' },
        {
            title: '押金',
            colKey: 'yaPrice',
            cell({ row }) {
                return row.yaPrice || '无'
            }
        },
        { title: '简称', colKey: 'shortName' },
        { title: '入住人数', colKey: 'liveLimit' },
        { title: '早餐券数量', colKey: 'couponNum' },
        {
            title: '操作', colKey: 'colKey',
            render: (_, record) => {
                return <>
                    <Button type="primary" size="small" onClick={() => handlerDel(record._id)}>删除</Button>
                    <Button type="primary" style={{ marginLeft: '5px' }} size="small" onClick={() => openEdit(record)}>修改</Button>
                </>
            }

        }
    ], [])


    const [showAdd, setShowAdd] = useState(false)
    const formRef = useRef(null)

    const onClose = () => {
        setShowAdd(false);
    };
    //  添加房型的操作
    const onFinish = async (values) => {
        let res = await addType(values);
        const { success } = res;
        if (!success) return message.warning('添加失败');
        message.info('添加成功');
        getData(); // 刷新表格
        setShowAdd(false) // 抽屉隐藏
        console.log('Success:', values);
        formRef.current.resetFields(); // 重置表单
        console.log(formRef.current)

    };
    //失败返回的错误信息
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Qfpage title="房型维护">
            <div style={{ padding: '15px' }}>
                <Row>
                    <Col span={3}>
                        <Button type="primary" onClick={() => setShowAdd(true)}>添加新的房型</Button>
                    </Col>
                    <Col span={3}></Col>
                    <Col span={6}>

                        <Input placeholder="输入你有查询的房型" onChange={(e) => setName(e.target.value)} />

                    </Col>
                    <Col span={6}>
                        <Input placeholder="按价格查询" onChange={(e) => setPrice(e.target.value)} />

                    </Col>
                    <Col span={6}>
                        <Button onClick={getData} style={{ marginLeft: '25px' }}  >立即查询</Button>
                    </Col>

                </Row>
            </div>

            <Table columns={columns} dataSource={data}
                pagination={{
                    defaultPageSize: limit,
                    total,
                    onChange() {
                        setPage(current);
                        setLimit(pageSize)
                    },

                }}
            >
            </Table>

            {/* 添加房型的抽屉 */}
            <Drawer visible={showAdd} title="请添加你要的房型" width={500}
                onClose={onClose}

            >
                <Form onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    ref={formRef}
                    autoComplete="off"

                >
                    <Form.Item label='房型名称' name="name" rules={[{ required: true, message: '请填写房型' }]}
                    >
                        <Input placeholder="请填写房型名称" />
                    </Form.Item>
                    <Form.Item label='房型简称' name="shortName">
                        <Input placeholder="请填写房型简称" />
                    </Form.Item>

                    <Form.Item label='早餐券数量' name="couponNum" >
                        <Input placeholder="填写早餐券数量" />
                    </Form.Item>
                    <Form.Item label='入住人数' name="liveLimit"  >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label='床数' name="beds"   >
                        <InputNumber min={1} max={5} />
                    </Form.Item>
                    <Form.Item label='价格' name="price">
                        <Input placeholder="填写房型价格" prefix="￥" suffix="RMB/天" />
                    </Form.Item>
                    <Form.Item label='押金' name="yaPrice">
                        <Input placeholder="填写押金" />
                    </Form.Item>
                    <Space style={{ margin: '15px' }} >
                        <Button onClick={onClose}>取消</Button>
                        <Button type="primary" htmlType="submit" >
                            立即添加
                        </Button>
                    </Space>


                </Form>

            </Drawer>

        </Qfpage>


    )
}

export default Room;