import React, {useEffect, useState} from 'react';
import {Alert, Button, Form, Input, Row, Space, Spin, Select} from "antd";
import {useSelector} from "react-redux";
import {useActions} from "../../../hooks/useActions";

let typeDeviceSelect = null;

const ModelModal = (props) => {

    const [form] = Form.useForm();

    const [values, setValues] = useState(props.values);
    const {parentRec} = props;
    const {isSavingModel} = useSelector(state => state.device)
    const {deviceTypeList} = useSelector(state => state.deviceType)
    const {saveModel, loadDeviceType} = useActions();
    const [error, setError] = useState();

    useEffect(()=>{
        loadDeviceType();
        typeDeviceSelect.focus();
        // eslint-disable-next-line
    }, [])

    const save = (saveAdd) => {
        form.validateFields()
            .then(() => {
                (async function () {
                    const temp = {...values, firm: parentRec}
                    const result = await saveModel(temp);
                    if (result.isOk) {
                        if (saveAdd) {
                            setError('');
                            setValues({...values, name:'', deviceType:{}});
                            form.resetFields();
                            typeDeviceSelect.focus();
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

    function handleChange(value, objectValues) {
        setValues({...values, deviceType:objectValues.object})
    }

    return (
        <Spin tip="Сохранение данных..." spinning={isSavingModel}>
            <Form form={form} autoComplete="off">
                {error &&
                <Alert message={error} type="error"/>
                }

                <Form.Item
                    label="Тип оборудования"
                    name="deviceType"
                    initialValue={!values.deviceType ? null : values.deviceType.name}
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста укажите тип оборудования'
                        }
                    ]}
                >
                    <Select
                        showSearch
                        value={!values.deviceType ? null : values.deviceType.name}
                        onChange={handleChange}
                        ref={select => {
                            typeDeviceSelect = select;
                        }}
                    >
                        {deviceTypeList.map((line) => {
                            return (
                                <Select.Option value={line.name} key={line.id} object={line}>
                                    {line.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
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
                        value={values.name}
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

export default ModelModal;