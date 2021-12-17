import React, {useEffect, useState} from 'react';
import {Alert, Button, Form, Input, Row, Space, Spin} from "antd";
import {useSelector} from "react-redux";
import {useActions} from "../../../hooks/useActions";

let nameInput = null;

const CounterpartyModal = (props) => {

    const [form] = Form.useForm();

    const [values, setValues] = useState(props.values);
    const {isSaving} = useSelector(state => state.counterparty)
    const {saveCounterparty} = useActions();
    const [error, setError] = useState();

    useEffect(() => {
        nameInput.focus();
        // eslint-disable-next-line
    }, [])

    const save = (saveAdd) => {
        form.validateFields()
            .then(() => {
                (async function () {
                    const result = await saveCounterparty(values);
                    if (result.isOk) {
                        if (saveAdd) {
                            setError('');
                            setValues({});
                            form.resetFields();
                            nameInput.focus();
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
            <Form form={form} layout={'vertical'} autoComplete="off">
                {error &&
                <Alert message={error} type="error"/>
                }
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
                        value={values.name}
                        ref={input => {
                            nameInput = input;
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="ИНН"
                    // name="firstName"
                >
                    <Input
                        onChange={e => setValues({...values, inn: e.target.value})}
                        value={values.inn}
                    />
                </Form.Item>
                <Form.Item
                    label="Телефон"
                    // name="telephone"
                >
                    <Input
                        onChange={e => setValues({...values, telephone: e.target.value})}
                        value={values.telephone}
                    />
                </Form.Item>
                <Form.Item
                    label="E-mail"
                    // name="email"
                >
                    <Input
                        onChange={e => setValues({...values, email: e.target.value})}
                        value={values.email || ""}
                    />
                </Form.Item>
                <Form.Item
                    label="Контактное лицо"
                    // name="middleNames"
                >
                    <Input
                        onChange={e => setValues({...values, contact: e.target.value})}
                        value={values.contact}
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

export default CounterpartyModal;