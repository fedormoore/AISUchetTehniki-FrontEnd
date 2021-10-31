import React, {useState} from 'react';
import {Button, Form, Input, Row, Select} from "antd";

const UserModal = (props) => {

    const [form] = Form.useForm();
    const [values, setValues] = useState({});

    const submitForm = () => {

        props.submit(values);
        form.resetFields();
    }

    return (
        <Form form={form} onFinish={submitForm} >
            <Form.Item
                label="E-mail"
                name="email"
            >
                <Input
                    onChange={e => setValues({...values, email: e.target.value})}
                    value={values.email}
                />
            </Form.Item>
            <Form.Item
                label="Фамилия"
                name="lastName"
            >
                <Input
                    onChange={e => setValues({...values, lastName: e.target.value})}
                    value={values.lastName}
                />
            </Form.Item>
            <Form.Item
                label="Имя"
                name="firstName"
            >
                <Input
                    onChange={e => setValues({...values, firstName: e.target.value})}
                    value={values.firstName}
                />
            </Form.Item>
            <Form.Item
                label="Отчество"
                name="middleNames"
            >
                <Input
                    onChange={e => setValues({...values, middleNames: e.target.value})}
                    value={values.middleNames}
                />
            </Form.Item>
            <Form.Item
                label="Телефон"
                name="telephone"
            >
                <Input
                    onChange={e => setValues({...values, telephone: e.target.value})}
                    value={values.telephone}
                />
            </Form.Item>
            <Row justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Создать
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default UserModal;