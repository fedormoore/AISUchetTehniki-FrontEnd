import React from 'react';
import {Layout, Row, Form, Input, Button, Card} from "antd";
import {useSelector} from "react-redux";
import {useActions} from "../hooks/useActions";

function Login() {

    const {isLoading, error} = useSelector(state => state.auth)
    const {login} = useActions()

    const submit = (values: any) => {
        login(values)
    };

    return (
        <Layout>
            <Row justify="center" align="middle" className="h100">
                <Card>
                    <Form
                        onFinish={submit}
                        layout={'vertical'}
                    >
                        {error && <div style={{color: 'red'}}>
                            {error}
                        </div>}
                        <Form.Item
                            label="E-mail"
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Неверный E-mail',
                                },
                                {
                                    required: true,
                                    message: 'Пожалуйста укажите E-mail'
                                }
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Пароль"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста укажите пароль'
                                }
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{width: '100%'}} loading={isLoading}>
                                Вход
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Row>
        </Layout>
    );
};

export default Login;