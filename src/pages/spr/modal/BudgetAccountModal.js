import React, {useEffect, useState} from 'react';
import {Alert, Button, Form, Input, Row, Space, Spin, TreeSelect} from "antd";
import {useSelector} from "react-redux";
import {useActions} from "../../../hooks/useActions";

let codeInput = null;

const BudgetAccountModal = (props) => {

    const [form] = Form.useForm();

    const [values, setValues] = useState(props.values);
    const {isSaving} = useSelector(state => state.budgetAccount)
    const {saveBudgetAccount} = useActions();
    const [error, setError] = useState();

    useEffect(() => {
        codeInput.focus();
        // eslint-disable-next-line
    }, [])

    const save = (saveAdd) => {
        form.validateFields()
            .then(() => {
                (async function () {
                    const result = await saveBudgetAccount(values);
                    if (result.isOk) {
                        if (saveAdd) {
                            codeInput.focus();
                            setError('');
                            setValues({});
                            form.resetFields();
                        } else {
                            props.closeModal();
                        }
                    } else {
                        setError(result.message);
                    }
                })();
            })
    }

    const closeModal = () => {
        props.closeModal();
    }

    return (
        <Spin tip="Сохранение данных..." spinning={isSaving}>
            <Form form={form} autoComplete="off">
                {error &&
                <Alert message={error} type="error"/>
                }
                <Form.Item
                    label="Код"
                    name="code"
                    initialValue={values.code}
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста укажите код'
                        }
                    ]}
                >
                    <Input
                        onChange={e => setValues({...values, code: e.target.value})}
                        value={values.code || ""}
                        ref={input=>{
                            codeInput=input;
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="Наименование"
                    name="name"
                    initialValue={values.name}
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста укажите наименование'
                        }
                    ]}
                >
                    <Input
                        onChange={e => setValues({...values, name: e.target.value})}
                        value={values.lastName}
                    />
                </Form.Item>
                <Row justify="end">
                    <Space>
                        <Form.Item>
                            <Button type="primary"
                                    onClick={() => save(false)}>
                                Сохранить
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary"
                                    onClick={() => save(true)}
                            >
                                Сохранить/Добавить
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="default"
                                    onClick={() => closeModal()}>
                                Отмена
                            </Button>
                        </Form.Item>
                    </Space>
                </Row>
            </Form>
        </Spin>
    );
};

export default BudgetAccountModal;