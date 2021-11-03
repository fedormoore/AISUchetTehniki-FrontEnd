import React, {useState} from 'react';
import {Alert, Button, Form, Input, Row, Space, Spin} from "antd";
import {useSelector} from "react-redux";
import {useActions} from "../../../hooks/useActions";

const FirmModal = (props) => {

    const [values, setValues] = useState(props.values);
    const {isSavingFirm} = useSelector(state => state.device)
    const {saveFirm} = useActions();
    const [error, setError] = useState();

    const submitForm = () => {
        (async function () {
            const result = await saveFirm(values);
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

    return (
        <Spin tip="Сохранение данных..." spinning={isSavingFirm}>
            <Form onFinish={submitForm} >
                {error &&
                <Alert message={error} type="error"/>
                }
                <Form.Item
                    label="Наименование"
                    name="name"
                    valuePropName={"values.name"}
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста укажите наименование'
                        }
                    ]}
                >
                    <Input
                        onChange={e => setValues({...values, name: e.target.value})}
                        value={values.name || ""}
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

export default FirmModal;