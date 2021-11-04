import React, {useState} from 'react';
import {Alert, Button, Card, Form, Input, Layout, Row, Modal} from "antd";
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";
import {useHistory} from "react-router-dom";
import {routeNames} from "../../routes";

const Registration = () => {

    const {isLoading, error} = useSelector(state => state.auth)
    const [values, setValues] = useState({});
    const {registration} = useActions()
    const router = useHistory();

    const submit = () => {
        (async function () {
            const result = await registration(values);
            if (result.isOk) {
                info();
            }
        })();
    };

    function info() {
        Modal.info({
            title: 'Пользователь успешно зарегистрирован!',
            content: (
                <div>
                    <p>Перейти по ссылке, высланной в письме для ативации учетной записи.</p>
                </div>
            ),
            onOk() {router.push(routeNames.MAIN)},
        });
    }

    return (
        <Layout>
            <Row justify="center" align="middle" className="h100">
                <Card>
                    <Form
                        onFinish={submit}
                        layout={'vertical'}
                    >
                        {error &&
                        <Alert message={error} type="error"/>
                        }
                        <Form.Item
                            label="Имя"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста укажите имя'
                                }
                            ]}
                        >
                            <Input
                                value={'firstName'}
                                onChange={e => setValues({...values, firstName: e.target.value})}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Фамилия"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста укажите фамилию'
                                }
                            ]}
                        >
                            <Input
                                value={'lastName'}
                                onChange={e => setValues({...values, lastName: e.target.value})}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Наименование организации"
                            name="organization"
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста укажите наименование организации'
                                }
                            ]}
                        >
                            <Input
                                value={'organization: '}
                                onChange={e => setValues({...values, organization: {name: e.target.value}})}
                            />
                        </Form.Item>
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
                            <Input
                                value={'email: '}
                                onChange={e => setValues({...values, email: e.target.value})}
                            />
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
                            <Input
                                value={'password: '}
                                onChange={e => setValues({...values, password: e.target.value})}
                                type={"password"}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{width: '100%'}}
                                    loading={isLoading}>
                                Регистрация
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Row>
        </Layout>
    );
};

export default Registration;