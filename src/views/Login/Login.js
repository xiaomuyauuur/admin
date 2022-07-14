import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import './style.scss'
import { Component } from 'react';
import { loginAdmin } from '../../api/admin'
import { message } from 'antd';
import withRouter from '../../util/withRouter';
import { connect } from 'react-redux';
import { setAdminInfo } from '../../store/adminSlice'

// 类组件
class Login extends Component {

    state = {
        name: '',
        pwd: ''
    }

    handleLogin = async () => {
        if (!this.state.name) return message.info('请输入正确用户名')
        if (!this.state.pwd) return message.info('密码错误!')

        let res = await loginAdmin({
            name: this.state.name,
            pwd: this.state.pwd
        })

        console.log('res', res)
        console.log('props', this.props)

        this.props.dispatch(setAdminInfo(res.data))

        message.info('登录成功')
        // 登录成功 重定向到 index
        this.props.navigate('/index', { replace: true })

    }

    // onFinish = (values) => {
    //     console.log('Success:', values);
    // };

    // onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    render() {
        return (
            <div className='loginPage' >
                <div className='loginbox'>
                    <Form
                        className='login-form'
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    // autoComplete="off"
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入你的用户名!',
                                },
                            ]}
                        >
                            <Input
                                className="yhm"
                                placeholder="请填写用户名"
                                onChange={ev => this.setState({ name: ev.target.value })} />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                            ]}
                        >
                            <Input.Password
                                className='mima'
                                placeholder='请填写密码'
                                onChange={ev => this.setState({ pwd: ev.target.value })}
                            />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={this.handleLogin}
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

        );
    }


};

const mapStateToProps = (state) => ({ ...state })

export default connect(mapStateToProps)(withRouter(Login));