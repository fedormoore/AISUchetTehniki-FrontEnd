import React, {useEffect, useState} from 'react';
import {Alert, Button, Form, Input, Row, Space, Spin} from "antd";
import {useSelector} from "react-redux";
import {useActions} from "../../../hooks/useActions";

let nameInput = null;

const DeviceTypeModal = (props) => {

    const [form] = Form.useForm();

    const [values, setValues] = useState(props.values);
    const {isSaving} = useSelector(state => state.deviceType)
    const {saveDeviceType} = useActions();
    const [error, setError] = useState();

    useEffect(() => {
        nameInput.focus();
        // eslint-disable-next-line
    }, [])

    const save = (saveAdd) => {
        form.validateFields()
            .then(() => {
                (async function () {
                    const result = await saveDeviceType(values);
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
            <Form form={form} autoComplete="off">
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

export default DeviceTypeModal;