import React, {useEffect, useState} from 'react';
import {Alert, Button, Form, Input, Row, Space, Spin, Select} from "antd";
import {useSelector} from "react-redux";
import {useActions} from "../../../hooks/useActions";

const ModelModal = (props) => {

    const [values, setValues] = useState(props.values);
    const {parentRec} = props;
    const {isSavingModel} = useSelector(state => state.device)
    const {deviceTypeList} = useSelector(state => state.deviceType)
    const {saveModel, loadDeviceType} = useActions();
    const [error, setError] = useState();

    useEffect(()=>{
        loadDeviceType();
        // eslint-disable-next-line
    }, [])

    const submitForm = () => {
        (async function () {
            const temp = {...values, firm:parentRec}
            const result = await saveModel(temp);
            if (result.isOk) {
                props.closeModal();
            } else {
                setError(result.message);
            }
        })();
    }

    const closeModal = () => {
        props.closeModal();
    }

    function handleChange(value, objectValues) {
        setValues({...values, deviceType:objectValues.object})
    }

    return (
        <Spin tip="Сохранение данных..." spinning={isSavingModel}>
            <Form onFinish={submitForm} >
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
                            <Button type="default" onClick={() => closeModal()}>
                                Отмена
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Сохранить
                            </Button>
                        </Form.Item>
                    </Space>
                </Row>
            </Form>
        </Spin>
    );
};

export default ModelModal;